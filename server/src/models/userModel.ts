import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    clerkId: { type: 'string', required: true, unique: true },
    emil: { type: 'string', required: true, unique: true },
    photo: { type: 'string', required: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    creditBalance:{ type:Number , default:5}
        

})

const userModel = mongoose.model('User', userSchema);



export default userModel;


