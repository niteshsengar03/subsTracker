import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req,res,next)=>{
    // Atomic updates
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        // create a new user
        const {name,email,password} = req.body;
        // user already exist
        const existingUser = await User.findOne({email});
        if(existingUser==null){
            // Hash password to store in database
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const newUser = await User.create([{name,email,password:hashPassword}],{session}); 
            // console.log(newUser);
            const token = jwt.sign({userId: newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        } else{
            const error =  new Error("User already exists");
            error.statusCode = 409;
            throw error; 
        }
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created',
            data:{
                token,
                user: newUser[0]
            }
        })
    } catch(er){
        if(session.inTransaction())
            await session.abortTransaction();
        session.endSession();
        next(er);
    }
}

export const signIn = async(req,res,next)=>{

}

export const signOut = async(req,res,next)=>{

}