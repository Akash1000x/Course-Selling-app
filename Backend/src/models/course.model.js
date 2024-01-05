import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink:  {
        type: String,
        required: true,
    },
    published:  {
        type: Boolean,
        required: true,
    }
});

const Course = mongoose.model('Course',courseSchema);

export default Course ;