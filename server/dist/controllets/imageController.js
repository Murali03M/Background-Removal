"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBgImage = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const userModel_1 = __importDefault(require("../models/userModel"));
const removeBgImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { clerkId } = req.body;
        if (!clerkId) {
            res.status(400).json({ success: false, message: "Clerk ID is required" });
            return;
        }
        const user = yield userModel_1.default.findOne({ clerkId });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        if (user.creditBalance === 0) {
            res.status(403).json({ success: false, message: "Insufficient credit balance" });
            return;
        }
        const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!imagePath) {
            res.status(400).json({ success: false, message: "No image file provided" });
            return;
        }
        const image = fs_1.default.createReadStream(imagePath);
        const form = new form_data_1.default();
        form.append('image_file', image);
        const { data } = yield axios_1.default.post("https://clipdrop-api.co/remove-background/v1", form, {
            headers: Object.assign({ 'x-api-key': process.env.CLIPDROP_API }, form.getHeaders()),
            responseType: 'arraybuffer',
        });
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;
        yield userModel_1.default.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });
        res.status(200).json({
            success: true,
            resultImage,
            creditBalance: user.creditBalance - 1,
            message: "Background removed successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.removeBgImage = removeBgImage;
//# sourceMappingURL=imageController.js.map