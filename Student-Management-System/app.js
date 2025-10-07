const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/students', studentRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});