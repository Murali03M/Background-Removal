"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get('/', (_req, res) => {
    res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    res.send('pong 🏓');
});
// Export the Express app for Vercel
exports.default = app;
// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
    });
}
//# sourceMappingURL=index.js.map