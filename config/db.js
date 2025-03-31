const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Atlas Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;