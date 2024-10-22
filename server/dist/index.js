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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = __importDefault(require("./config/mongodb"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// Function to connect to the database and start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongodb_1.default)(); // Await the database connection
        console.log('Database connected...');
        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); // Exit the process if there's an error
    }
});
// Middleware setup
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Basic route
app.get('/', (_, res) => {
    res.send("Hello World!");
});
// Start the server and connect to the database
startServer();
