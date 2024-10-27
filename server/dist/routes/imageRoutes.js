"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllets/imageController");
const auth_1 = require("../middlewares/auth");
const multer_1 = __importDefault(require("../middlewares/multer"));
const imageRouter = express_1.default.Router();
imageRouter.post('/remove-bg', multer_1.default.single('image'), auth_1.authUser, auth_1.customAuthMiddleware, imageController_1.removeBgImage);
exports.default = imageRouter;
//# sourceMappingURL=imageRoutes.js.map