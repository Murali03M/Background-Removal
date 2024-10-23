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
const express_1 = __importDefault(require("express"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userModel_1 = __importDefault(require("./models/userModel"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
// Function to connect to the database and start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongodb_1.default)(); // Await the database connection
        console.log('Database connected...');
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
});
app.use('/api/user', userRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Express Typescript on Vercel');
});
app.post('/api/test-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body; // Make sure this is in the right format
        yield userModel_1.default.create(userData);
        res.status(201).json({ success: true });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}));
startServer();
// Export the Express app for Vercel
exports.default = app;
// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map