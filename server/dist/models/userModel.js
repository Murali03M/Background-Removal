"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    clerkId: { type: 'string', required: true, unique: true },
    emil: { type: 'string', required: true, unique: true },
    photo: { type: 'string', required: true },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    creditBalance: { type: Number, default: 5 }
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map