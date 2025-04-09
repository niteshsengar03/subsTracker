import mongoose from "mongoose"

export const signUp = async (req,res,next)=>{
    // Atomic updates
    const session = await mongoose.startSession();
}

export const signIn = async(req,res,next)=>{

}

export const signOut = async(req,res,next)=>{

}