import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js'

if(!DB_URI) {
    throw new Error("MongoDB URI is missing");
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to Database in ${NODE_ENV} mode`);
    } catch(error){
        console.log("Find Error");
        console.error(error);
        process.exit(1);
    }
}

export default connectToDatabase;