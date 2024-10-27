"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    clerkId: { type: String, required: true, unique: true },
    plan: { type: String, required: true },
    credit: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number }
});
const transcationModel = mongoose_1.default.model('transaction', transactionSchema);
exports.default = transcationModel;
//# sourceMappingURL=transactionModel.js.map