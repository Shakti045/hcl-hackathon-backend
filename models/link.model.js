import mongoose from "mongoose";
import { string } from "zod";

export const LinkSchema = new mongoose.Schema({
    frombic:{
        type: String,
        required: true
    },
    tobanks:[
        {
            tobic:{
                type:String,
                required: true
            },
            timerequired:{
                type:Number
            }
        }
    ]
});

export const Link = mongoose.model("Link",LinkSchema);