 const mongoose = require("mongoose")


 const defaulterSchema = new mongoose.Schema({
    name: String,
    detail:String,
    date: { type: Date, default: Date.now }
 })


 export const  Defaulter = mongoose.model("Defaulter", defaulterSchema)
