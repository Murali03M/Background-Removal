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
exports.clerkWebhooks = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const svix_1 = require("svix");
const clerkWebhooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("Webhook received.");
        const whook = new svix_1.Webhook(process.env.CLERK_WEBHOOK_SECRET || '');
        // Verify the webhook signature using raw body
        const svixId = req.headers["svix-id"];
        const svixSignature = req.headers["svix-signature"];
        const svixTimestamp = req.headers["svix-timestamp"];
        if (!svixId || !svixSignature || !svixTimestamp) {
            throw new Error("Missing required Svix headers for webhook verification");
        }
        // Verify the webhook signature
        whook.verify(JSON.stringify(req.body), {
            "svix-id": svixId,
            "svix-signature": svixSignature,
            "svix-timestamp": svixTimestamp
        });
        // Extract the data and type from the body
        const { data, type } = req.body;
        // Ensure type is one of the expected values
        if (!data || !type) {
            throw new Error("Invalid webhook payload");
        }
        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: ((_a = data.email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address) || '',
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    photo: data.image_url || ''
                };
                // Create the user in the database
                const newUser = yield userModel_1.default.create(userData);
                res.status(201).json({ success: true, data: newUser });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: ((_b = data.email_addresses[0]) === null || _b === void 0 ? void 0 : _b.email_address) || '',
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    photo: data.image_url || ''
                };
                // Update the user in the database
                const updatedUser = yield userModel_1.default.findOneAndUpdate({ clerkId: data.id }, userData, { new: true });
                if (!updatedUser) {
                    throw new Error("User not found");
                }
                res.status(200).json({ success: true, data: updatedUser });
                break;
            }
            case "user.deleted": {
                const result = yield userModel_1.default.findOneAndDelete({ clerkId: data.id });
                if (!result) {
                    throw new Error("User not found");
                }
                res.status(204).json({ success: true });
                break;
            }
            default: {
                res.status(400).json({ success: false, message: "Unhandled webhook type" });
                break;
            }
        }
    }
    catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.clerkWebhooks = clerkWebhooks;
//# sourceMappingURL=userControllers.js.map