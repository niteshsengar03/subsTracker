import mongoose from "mongoose";
import { DB_URL } from "../config/env";

if(!DB_URL)
    throw new Error ("Please define the monogdb url inside .env.development.local");
