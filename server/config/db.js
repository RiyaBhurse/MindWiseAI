const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.once('connected', () => {
    console.log('MongoDB connection established successfully');
})

connection.on('error', (err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
})