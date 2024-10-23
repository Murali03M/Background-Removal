"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userControllers_1 = require("../controllets/userControllers");
const userRouter = express_1.default.Router();
userRouter.post('/webhooks', body_parser_1.default.raw({ type: 'application/json' }), userControllers_1.clerkWebhooks);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map