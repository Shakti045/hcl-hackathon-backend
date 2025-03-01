
import { Bank } from "../models/bank.model.js";
import { Link } from "../models/link.model.js";
import { Graph } from "../utils/graph.js";
export const buildGraph = async()=>{
   try {
     console.log("Fetching data from db...");
     const banks = await Bank.find({},{bic:1,charge:1});
     const links = await Link.find({},{frombic:1,tobanks:1});
     console.log(links[0].tobanks[0].tobic);
     return new Graph(banks,links);
   } catch (error) {
    console.log("db data extraction failed",error);
   }
}