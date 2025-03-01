import { Transanction } from "../models/trasanction.model.js";
import { buildGraph } from "../scripts/graph.js";

let graph = null;

export const leastchargeclaculator = async(req,res)=>{
    try {
        const {fromBic,srcBic} = req.query;
        const {userId} = req.body;
        if(graph==null){
            graph = await buildGraph();
        }
        const charge = graph.findCheapestCharge(fromBic,srcBic);
        await Transanction.create({userId,fromBic,toBic:srcBic,status:"pending"});
        return res.status(200).json({
            success:true,
            message:"Charge calculated successfully",
            fromBic,
            srcBic,
            charge
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Charge calculation failed",
        })
    }
}


export const leastTimeCalculator = async(req,res)=>{
    try {
        const {fromBic,srcBic} = req.query;
        const {userId} = req.body;
        if(graph==null){
            graph = await buildGraph();
        }
        const time = graph.findLeastTime(fromBic,srcBic);
        await Transanction.create({userId,fromBic,toBic:srcBic,status:"pending"});
        return res.status(200).json({
            success:true,
            message:"Time calculated successfully",
            fromBic,
            srcBic,
            time
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Time calculation failed",
        })
    }
}


export const confirmtransaction = async(req,res)=>{
    try {
         const {trasactionId} = req.params;
         if(!trasactionId){
             return res.status(400).json({
                success:false,
                message:"Transaction id is missing",
            })
         }
         await Transanction.findByIdAndUpdate(trasactionId,{status:"success"});
         return res.status(200).json({
            success:true,
            message:"Transaction confirmed successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Transaction confirmation failed",
        })
    }
}


export const getusertrasactions = async(req,res)=>{
  try {
    const trasactios = await Transanction.find({userId:req.body.userId});
    return res.status(200).json({
        success:true,
        message:"Transaction confirmed successfully",
        trasactios
    })
  } catch (error) {
     return res.status(500).json({
        success:false,
        message:"Transaction confirmation failed",
     })
  }
}