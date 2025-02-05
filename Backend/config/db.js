const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin123:admin123@cluster0.o2tle.mongodb.net/neurostack'); // Removed deprecated options
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
