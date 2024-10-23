import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true }, // Use String instead of 'string'
    email: { type: String, required: true},
    photo: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    creditBalance: { type: Number, default: 5 } // Using Number type properly
});

// Create the model from the schema
const userModel = mongoose.model('User', userSchema);

export default userModel;
