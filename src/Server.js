// pythonshell will be used later
const { PythonShell } = require('python-shell');

// Express.js is used to create the server and handle API requests
const express = require('express');
const app = express();

// mongoose is used to connect to MongoDB, define schemas, and store information
const mongoose = require('mongoose');
const { schema } = require('mongoose');
const courseSchema = new schema({
  name: String,
  description: String,
  prompts: [String],
  answers: [String]
});
const Courses = mongoose.model('Course', courseSchema);
mongoose.connect('mongodb://localhost/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// GET request to fetch course prompts and previous answers to be given to the AI agent
app.get('/api/courses', async (req, res) => {
  try {
    const Course = await Courses.find(req.body.name);
    // previous prompts and answers to be implemented by the agent
    res.json(Course.prompt);
    res.json(Course.answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST request to add new course prompts and answers based on user interaction with the AI agent
app.post('/api/courses', async (req, res) => {
  const Course = await Courses.findOne({ name: req.body.name });
  if (!Course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  Course.prompt.push(req.body.prompt);
  Course.answers.push(req.body.answer);
  try {
    const result = await Course.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  mongoose.connection.close();
});