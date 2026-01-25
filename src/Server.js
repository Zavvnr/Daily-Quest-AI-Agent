// pythonshell will be used later
import { PythonShell } from 'python-shell';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Express.js is used to create the server and handle API requests
const app = express();
app.use(cors());
app.use(express.json());

// mongoose is used to connect to MongoDB, define schemas, and store information
const { Schema } = mongoose;
const courseSchema = new Schema({
  name: String,
  description: String,
  prompts: [String],
  answers: [String]
});
const Courses = mongoose.model('Course', courseSchema);
mongoose.connect('mongodb://127.0.0.1:27017/myDB').then(async () => {
    console.log('connected');
    // initialize DB
    await initialDBSetup()}).catch(err => {
    console.error('Connection error', err);
});

app.use(express.json());

// Function to initialize the database with some courses
async function initialDBSetup() {
  const courseCount = await Courses.countDocuments();
  if (courseCount === 0) {
    const initialCourses = [
      { name: 'Linear Optimization', description: 'Course on Linear Optimization', prompts: [], answers: [] },
      { name: 'Graphs and Networks in Data Science', description: 'Course on Graphs and Networks in Data Science', prompts: [], answers: [] },
      { name: 'Securing Information Networks', description: 'Course on Securing Information Networks', prompts: [], answers: [] },
      { name: 'Responsibility in the Age of Big Data and AI', description: 'Course on Responsibility in the Age of Big Data and AI', prompts: [], answers: [] },
      { name: 'Statistical Data Visualization', description: 'Course on Statistical Data Visualization', prompts: [], answers: [] },
      { name: 'Interaction Design Studio', description: 'Course on Interaction Design Studio', prompts: [], answers: [] }
    ];
    await Courses.insertMany(initialCourses);
    console.log('Courses added to the database');
  }
}
const db = mongoose.connection;

// DEBUG ROUTE: Check what is actually inside the DB
app.get('/api/debug/courses', async (req, res) => {
  try {
    const allCourses = await Courses.find({});
    // detailed log to console to see quotes and spaces
    console.log("DB CONTENTS:", JSON.stringify(allCourses, null, 2)); 
    res.json(allCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET request to fetch course prompts and previous answers to be given to the AI agent
app.get('/api/courses', async (req, res) => {
  try {
    const courseName = req.query.name; 
    const course = await Courses.findOne({ name: courseName });
    // previous prompts and answers to be implemented by the agent
    res.json({
      prompts: course.prompts,
      answers: course.answers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST request to add new course prompts and answers based on user interaction with the AI agent
app.post('/api/courses', async (req, res) => {
  const course = await Courses.findOne({ name: req.body.name });
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  course.prompts.push(req.body.prompt);
  course.answers.push(req.body.answer);
  try {
    const result = await course.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH request to ADD a new prompt to the 'prompts' array
app.patch('/api/courses/prompts', async (req, res) => {
  // Frontend send: { name: "Course Name", prompt: "The new input" }
  const { name, prompt } = req.body;

  try {
    const updatedCourse = await Courses.findOneAndUpdate(
      { name: name },                 // Find the course by name
      { $push: { prompts: prompt } }, // $push ADDS the new prompt to the array
      { new: true }                   // Return the updated document so we can see the change
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the updated list of prompts
    res.json(updatedCourse.prompts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Server setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});