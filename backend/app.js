const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./db/mongodb'); // Ensure this connects to MongoDB correctly
const cors = require('cors');
const jwt = require('jsonwebtoken');


const PORT = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON requests (MUST be before routes)
app.use(express.json()); // Global JSON parsing middleware
app.use(morgan('dev'));
app.use(cors()); // Ensure this is only once

// Enable CORS for a specific origin
app.use(cors({ origin: 'http://localhost:5173' }));

const postRoute = require('./routes/postRoute');
app.use('/api', postRoute);
// Import routes
const authRoute = require('./routes/auth');
// Authentication route
app.use('/api', authRoute);

app.listen(PORT, () => {
    console.log(`${PORT} is up and running`);
});
