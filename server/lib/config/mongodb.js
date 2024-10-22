import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/backgrounRemoval`);
        console.log('MongoDB connected successfully.');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};
export default connectDB;
