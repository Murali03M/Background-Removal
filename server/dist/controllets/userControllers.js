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
exports.rezorpayment = exports.userCredits = exports.clerkWebhooks = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const svix_1 = require("svix");
const razorpay_1 = __importDefault(require("razorpay"));
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const clerkWebhooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("Webhook received.");
        const whook = new svix_1.Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
        // Verify the webhook signature using raw body
        const svixId = req.headers["svix-id"];
        const svixSignature = req.headers["svix-signature"];
        const svixTimestamp = req.headers["svix-tiqmestamp"];
        if (!svixId || !svixSignature || !svixTimestamp) {
            throw new Error("Missing required Svix headers for webhook verification");
        }
        // Verify the webhook signature
        whook.verify(JSON.stringify(req.body), {
            "svix-id": svixId,
            "svix-signature": svixSignature,
            "svix-timestamp": svixTimestamp,
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
                    email: ((_a = data.email_addresses[0]) === null || _a === void 0 ? void 0 : _a.email_address) || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || "",
                };
                // Create the user in the database
                const newUser = yield userModel_1.default.create(userData);
                res.status(201).json({ success: true, data: newUser });
                break;
            }
            case "user.updated": {
                const userData = {
                    email: ((_b = data.email_addresses[0]) === null || _b === void 0 ? void 0 : _b.email_address) || "",
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    photo: data.image_url || "",
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
                res
                    .status(400)
                    .json({ success: false, message: "Unhandled webhook type" });
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
// get the user creidts
const userCredits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId } = req.body;
        const user = yield userModel_1.default.findOne({ clerkId });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            credit: user.creditBalance,
        });
    }
    catch (error) {
        console.error("Error fetching user credits:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
});
exports.userCredits = userCredits;
const razorpayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const rezorpayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, planId } = req.body;
        if (!clerkId) {
            res.status(400).json({
                success: false,
                message: "Clerk ID is required",
            });
            return;
        }
        const userData = yield userModel_1.default.findOne({ clerkId });
        if (!userData) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        let credits, plan, date, amount;
        switch (planId) {
            case "Basic":
                (plan = "Basic"), (credits = 100);
                amount = 100;
                break;
            case "Advanced":
                (plan = "Advanced"), (credits = 500);
                amount = 50;
                break;
            case "Business":
                (plan = "Business"), (credits = 5000);
                amount = 100;
                break;
            default:
                break;
        }
        date = Date.now();
        const transcationData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        };
        const newTransaction = yield transactionModel_1.default.create(transcationData);
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
        };
        yield razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                res.status(500).json({ success: false, message: error });
                return;
            }
            res.status(200).json({ success: true, data: order });
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
        return;
    }
});
exports.rezorpayment = rezorpayment;
//# sourceMappingURL=userControllers.js.map