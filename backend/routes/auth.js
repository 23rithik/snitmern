const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

const router = express.Router();

// POST /api/login - Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid  password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: employee._id, email: employee.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect based on the role (admin or regular employee)
    if (email === 'admin@gmail.com') {
      return res.json({ token, redirectTo: '/admin_home' });
    } else {
      return res.json({ token, redirectTo: '/user_home' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
