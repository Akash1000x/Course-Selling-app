import mongoose from "mongoose";
import {DB_NAME} from '../constant.js'
// import dotenv from 'dotenv';
// dotenv.config({});


async function connectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.error(`MongoDB connection failed `,err);
        throw err;
    }
}


export default connectDB;
