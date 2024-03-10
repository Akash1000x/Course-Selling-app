import connectDB from './db/index.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));



connectDB()
    .then(() => {
        app.on('error', (err) => {
            console.leg(`Error in connecting to db ${err}`);
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`Error in connecting to db ${err}`);
        throw err;
    })

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ msg: "hello world after the class" }));
