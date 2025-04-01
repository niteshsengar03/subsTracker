import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";


if(!DB_URL)
    throw new Error ("Please define the monogdb url inside .env.development.local");
console.log(DB_URL);

 const connectToDatabase = async () =>{
        try{
            await mongoose.connect(DB_URL);
            console.log("Connected to Database");
        } catch(err){
            console.log(err);
            // process.exit(1);
        }
}

export default connectToDatabase;