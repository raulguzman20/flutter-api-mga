const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MongoDB connection string is not defined');
        }
        await mongoose.connect(uri);
        console.log('MongoDB Atlas Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;