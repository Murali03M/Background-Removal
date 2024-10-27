import axios from "axios";
import fs from 'fs';
import FormData from 'form-data';
import userModel from "../models/userModel";
import { Request, Response } from "express";

const removeBgImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { clerkId } = req.body;

        if (!clerkId) {
            res.status(400).json({ success: false, message: "Clerk ID is required" });
            return;
        }

        const user = await userModel.findOne({ clerkId });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        if (user.creditBalance === 0) {
            res.status(403).json({ success: false, message: "Insufficient credit balance" });
            return;
        }

        const imagePath = req.file?.path;
        if (!imagePath) {
            res.status(400).json({ success: false, message: "No image file provided" });
            return;
        }

        const image = fs.createReadStream(imagePath);
        const form = new FormData();
        form.append('image_file', image);

        const { data } = await axios.post("https://clipdrop-api.co/remove-background/v1", form, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
                ...form.getHeaders(),
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        res.status(200).json({
            success: true,
            resultImage,
            creditBalance: user.creditBalance - 1,
            message: "Background removed successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { removeBgImage };
