import { bankdetails } from "../datas/bank.js";
import { linkdetails } from "../datas/link.js";
import { Bank } from "../models/bank.model.js";
import { Link } from "../models/link.model.js";



const bankdata = bankdetails;
export const createbankrecords = async () => { 
    try {
        console.log("Creating bank records......");
        const data = bankdetails.map((bank)=>({bic:bank.BIC,charge:bank.Charge}));
        await Bank.insertMany(data);
        console.log("Bank records created");
    } catch (error) {
        console.log("Bank records creation failed",error);
    }
};


export const createlinks = async()=>{
    try {
        console.log("Creating link records......");
        const map = new Map();
        linkdetails.forEach((link)=>{
            if(map.has(link.FromBIC)){
                map.get(link.FromBIC).push({
                    tobic:link.ToBIC,
                    timerequired:link.TimeTakenInMinutes
                });
            }else{
                map.set(link.FromBIC,[{
                    tobic:link.ToBIC,
                    timerequired:link.TimeTakenInMinutes
                }]);
            }
        });
        const data = [];
        for(let key of map.keys()){
            data.push({
                frombic:key,
                tobanks:map.get(key)
            })
        }
        await Link.insertMany(data);
        console.log("Link records created");
    } catch (error) {
        console.log("Link records creation failed",error);
    }
}