const express = require('express');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const router = express.Router();

// Register a new employee
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log('Request body:', req.body);

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new employee
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee registered successfully' });
    

  } catch (error) {
    console.log('Request body:', req.body);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch all employees (optional, if needed for an admin view)
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find().select('-password');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
