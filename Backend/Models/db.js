import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongo_uri = process.env.MONGO_AUTH;

mongoose.connect(mongo_uri)
.then(()=>{
    console.log("Connnected ")
})
.catch((err)=>{
    console.log("DB Con failed ", err);
})
