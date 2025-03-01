import redis from "../connections/redis.js";
import otpgenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import sendemail from "../utils/mail.js";
import { configDotenv } from "dotenv";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
configDotenv();
const access_secret = process.env.ACCESS_TOKEN_SECRET;


export const getotp = async (req,res) => {
   try {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success:false,
            message:"Email is required"
        })
    }
    const userexists = await User.findOne({emailid:email});
    if(userexists){
        return res.status(404).json({
            success:false,
            message:"User already exists"
        })
    }
    const key = `otp::${email}`;
    const otpexists = await redis.exists(key);
    if(otpexists){
        return res.status(429).json({
            success:false,
            message:'Retry after sometime'
        })
    }
    const otp = otpgenerator.generate(6,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});
    await sendemail(email,'Otp to verify emai id',`Your otp is ${otp}`);
    await redis.setex(key,300,otp);
    return res.status(200).json({
        success:true,
        message:"Otp sent to mail id"
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Serever error"
    })  
   }
}

export const signup = async (req,res) => {
    try {
        const {email,password,otp} = req.body;
        if(!email || !password || !otp){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const userexists = await User.findOne({emailid:email});
        if(userexists){
         return res.status(404).json({
            success:false,
            message:"User already exists"
          })
        }
        const key = `otp::${email}`;
        const serverotp = await redis.get(key);
        if(serverotp!=otp){
            return res.status(400).json({
                success:false,
                message:"Wrong otp"
            })
        }
        await redis.del(key);
        const hashedpassword = await bcrypt.hash(password,10);
        await User.create({
            email:email,
            password:hashedpassword
        })
        return res.status(200).json({
            success:true,
            message:"User created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Serever error"
        }) 
    }
}

export const login =  async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
               success:false,
               message:"All fields required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }
        const iscorrectpassword = await bcrypt.compare(password,user.password);
        if(!iscorrectpassword){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        const token = jwt.sign({userId:user._id}, access_secret, { expiresIn: "7d" });
        res.cookie("authToken",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success:true,
            token,
            message:"User loggedin"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Serever error"
        }) 
    }
}
