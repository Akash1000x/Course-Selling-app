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
        retryConnection();
  }
};

function retryConnection() {
  // Retry after a delay (e.g., 5 seconds)
  setTimeout(() => {
    connectDB()
      .then(() => {
        console.log('Reconnected to the database');
      
      })
      .catch((err) => {
        console.log(`Error in connecting to db ${err}`);
        // Recursive retry
        retryConnection();
      });
  }, 5000);
}



export default connectDB;
