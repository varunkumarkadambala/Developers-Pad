const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connecting to the Database
connectDB();

app.get('/', (req,res) => res.send("API is Running"));

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The App is running on port ${PORT}`));