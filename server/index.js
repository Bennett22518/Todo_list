const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const {Task, User} = require('./models/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import user model

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb")
.then(() => {console.log("database connected")})
.catch((err) => {console.log('MongoDB connection error:', err)})

const connection = mongoose.connection;

connection.once("open",() => {
    console.log("mongoose database connected successfully");
})

// Register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    username:username,
    email:email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error registering user', error });
  }
});

  // POST /login - Authenticate user
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user in MongoDB by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      // Compare password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  
      res.send({ message: 'Login successful',statuscode:200,token});
  
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  });

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  });
  
// Add new task
app.post('/tasks', async (req, res) => {
    const newTask = new Task({ text: req.body.text });
    try {
      const task = await newTask.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: 'Error adding task' });
    }
  });
  
  // Edit task
  app.put('/tasks/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        text: req.body.text
      }, { new: true });
      res.json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: 'Error updating task' });
    }
  });
  
  // Delete task
  app.delete('/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting task' });
    }
  });



app.listen(5000,() => {
    console.log("app runing on the port 3001")
})