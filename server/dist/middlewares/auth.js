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
exports.customAuthMiddleware = exports.authUser = void 0;
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authUser = (0, clerk_sdk_node_1.ClerkExpressWithAuth)();
const customAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("CALLING THE MIDDLWQsew");
        // Get token from authorization header instead of body
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized: No token provided'
            });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            if (!decoded || typeof decoded === 'string') {
                res.status(401).json({
                    success: false,
                    message: 'Invalid token format'
                });
                return;
            }
            // Type assertion for decoded token
            req.body.clerkId = decoded.clerkId;
            next();
        }
        catch (jwtError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
            return;
        }
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.customAuthMiddleware = customAuthMiddleware;
//# sourceMappingURL=auth.js.map