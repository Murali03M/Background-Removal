"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    clerkId: { type: String, required: true, unique: true }, // Use String instead of 'string'
    email: { type: String, required: true },
    photo: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    creditBalance: { type: Number, default: 5 } // Using Number type properly
});
// Create the model from the schema
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map