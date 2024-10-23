import mongoose from 'mongoose';

const connectDB = async () => {
    try {
      console.log(process.env.MONGODB_URI);
  
    await mongoose.connect(`${process.env.MONGODB_URI}/bgremoval`)
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;
