"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Configure storage options for multer with TypeScript
const storage = multer_1.default.diskStorage({
    // Specify the destination for uploaded files
    // destination: (req: Request, file: Express.Multer.File, callback) => {
    //     callback(null, path.join(__dirname, '../uploads')); // Ensure 'uploads' directory exists or adjust path accordingly
    // },
    // Configure the filename for uploaded files
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});
// Set up multer with the storage configuration
const upload = (0, multer_1.default)({
    storage: storage,
});
exports.default = upload;
//# sourceMappingURL=multer.js.map