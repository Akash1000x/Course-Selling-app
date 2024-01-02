import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import  cors from 'cors';
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = `${process.env.SECRET}`;
console.log(SECRET);

//connect to mongodb

(async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "courses"
        });

        console.log(`Connected to MongoDB at ${connectionInstance.connection.host}`);
    } catch (err) {
        console.log("MongoDB connection failed:", err);
        throw err;
    }
})()



//Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
        required: true,
    },
    imageLink: String,
    published: Boolean
});

//Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);



const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/admin/me', authenticateJwt, (req, res) => {
  const { username } = req.user; // Extracting the username from req.user
  res.status(200).json(username);
});

// Admin routes
app.post('/admin/signup', async (req, res) => {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1d' });
        console.log('Token:', token);
        res.status(200).json({ message: 'Admin created successfully', token });
    }
});


app.post('/admin/login', async (req, res) => {
    // logic to log in admin
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Logged in successfully', token });
    } else {
        res.status(404).json({ message: 'Invalid username or password' });
    }
});

// logic to create a course
app.post('/admin/courses', authenticateJwt, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.json({ message: 'Course created successfully', courseId: course.id });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course', error: error.message });
    }
});


// logic to edit a course
app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// logic to get all courses
app.get('/admin/courses',authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new User({ username, password });
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1d' });
        res.json({ message: 'User created successfully', token });
    }
});

// logic to log in user
app.post('/users/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = User.findOne({ username, password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1d' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// logic to list all courses.
app.get('/users/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses: courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
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
app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    console.log(user);
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});