const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to the Database")
    } catch (err) {
        console.error("Failed to connect to DB");
        // Exiting process with a fail status
        process.exit(1);
    }
};

module.exports = connectDB;
