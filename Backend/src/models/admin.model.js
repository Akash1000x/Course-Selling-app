import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim: true,
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    
}, { timestamps: true });

const Admin = mongoose.model('Admin',adminSchema);

 export default  Admin;