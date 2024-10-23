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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
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