const mongoose = require('../mongoose-provider');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Allow fallback local-file-db database to handle requests
  }
};

module.exports = connectDB;
