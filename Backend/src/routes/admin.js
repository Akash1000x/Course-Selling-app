import express from 'express';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Course from '../models/course.model.js';
import jwt from 'jsonwebtoken';
import authenticateJwt from '../middleware/auth.js';
// import dotenv from 'dotenv';
// dotenv.config();



// const app = express();
const router = express.Router();


const SECRET = `${process.env.SECRET}`;
const tokenExpire = `${process.env.JWT_TOKEN_EXPIRE}`;

console.log(SECRET);

router.get('/me', authenticateJwt, (req, res) => {
    const { username } = req.user; // Extracting the username from req.user
    res.status(200).json(username);
});


router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: tokenExpire });
        console.log('Token:', token);
        res.status(200).json({ message: 'Admin created successfully', token });
    }
});

router.post('/login', async (req, res) => {
    // logic to log in admin
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: tokenExpire });
        res.status(200).json({ message: 'Logged in successfully', token });
    } else {
        res.status(504).json({ message: 'Invalid username or password' });
    }
});


// logic to create a course
router.post('/courses', authenticateJwt, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.json({ message: 'Course created successfully', courseId: course.id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error: error.message });
    }
});

//edit a course
router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  try {
    const existingCourse  = await Course.findById(req.params.courseId);

    if(!existingCourse){
       return res.status(404).json({message:"Course not find"})
    }
    const updateData = {
        ...existingCourse.toObject(),
        ...req.body,
    };
    const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId,updateData,{ new: true });
    res.json({ message: 'Course updated successfully', data: updatedCourse });
   
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// logic to get all courses
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});



export default router;