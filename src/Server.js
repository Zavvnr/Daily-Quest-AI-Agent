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
  prompt: String
});
const Course = mongoose.model('Course', courseSchema);
mongoose.connect('mongodb://localhost/myDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// data processing will be implemented later
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find(req.body.name);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// data processing will be implemented later
app.post('/api/courses', async (req, res) => {
  await mongoose.connect('mongodb://localhost/myDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const updateCourse = new Course({
    name: req.body.name,
    description: req.body.description,
    prompt: req.body.prompt
  });
});