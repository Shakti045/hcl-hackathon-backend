import mongoose from "mongoose";

export const TransanctionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    fromBic:{
        type: String,
        required: true
    },
    toBic:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:["pending","success"]
    }
});

export const Transanction =  mongoose.model("Transanction",TransanctionSchema);