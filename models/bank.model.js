import mongoose from "mongoose";

export const BankScheema = new mongoose.Schema({
    bic:{
        type: String,
        required: true,
        unique: true,
    },
    charge:{
        type: Number,
        required: true
    }
})


export const Bank = mongoose.model("Bank",BankScheema);