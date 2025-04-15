import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
    let token;
    let newUser;
    // Atomic updates
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // create a new user
        const { name, email, password } = req.body;
        // user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser == null) {
            // Hash password to store in database
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
             newUser = await User.create([{ name, email, password: hashPassword }], { session });
            // console.log(newUser);
             token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            // console.log(token);
        } else {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created',
            data: {
                token,
                user: newUser[0]
            }
        })
    } catch (er) {
        if (session.inTransaction())
            await session.abortTransaction();
        session.endSession();
        next(er);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // user doesnot exist in database
        if (!user) {
            const error = new Error("User doest not exist");
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Password in incorrect");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: 'User signed in',
            data: {
                token,
                user
            }
        });
    }
    catch (err) {
        next(err);
    }
}

export const signOut = async (req, res, next) => {

}