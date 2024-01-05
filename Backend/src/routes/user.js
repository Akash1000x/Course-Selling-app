import express from 'express';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Course from '../models/course.model.js';
import authenticateJwt from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();


const router = express.Router();


const SECRET = `${process.env.SECRET}`;
const tokenExpire = `${process.env.JWT_TOKEN_EXPIRE}`;

console.log(SECRET);

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: tokenExpire });
        res.json({ message: 'User created successfully', token });
    }
});


// logic to log in user
router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: tokenExpire });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// logic to list all courses.
router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses: courses });
});


router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        console.log(req.user);
        const user = await User.findOne({ username: req.user.username });
        console.log(user);
        if (user) {
            // if(!user.purchasedCourses){
            //   user.purchasedCourses = [];
            // }
            user.purchasedCourses.push(course);
            await user.save();

            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: 'User not found' });
        }
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});



// logic to view purchased courses
router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    console.log(user);
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

export default router;

