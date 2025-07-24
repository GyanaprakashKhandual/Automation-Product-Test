const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected on cloud now');
  } catch (error) {
    console.log('Some error occurred:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
