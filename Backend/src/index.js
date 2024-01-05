import connectDB from './db/index.js';
// import authenticateJwt from './middleware/auth.js';

import express from 'express';
// import mongoose from 'mongoose';
import  cors from 'cors';
// import jwt from 'jsonwebtoken';

import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';

import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
// const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(cors());

// const SECRET = `${process.env.SECRET}`;
// console.log(SECRET);

//connect to mongodb

connectDB()
.then(()=>{
    app.on('error',(err) => {
        console.leg(`Error in connecting to db ${err}`);
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(`Error in connecting to db ${err}`);
    throw err;
})

app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));
