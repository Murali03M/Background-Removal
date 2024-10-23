import { Request, Response } from 'express'; 
import userModel from '../models/userModel'; 
import { Webhook } from 'svix'; 

const clerkWebhooks = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Webhook received.");

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

        // Verify the webhook signature using raw body
        const svixId = req.headers["svix-id"] as string;
        const svixSignature = req.headers["svix-signature"] as string;
        const svixTimestamp = req.headers["svix-timestamp"] as string;

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
                    email: data.email_addresses[0]?.email_address || '', 
                    firstName: data.first_name || '', 
                    lastName: data.last_name || '', 
                    photo: data.image_url || '' 
                };

                // Create the user in the database
                const newUser = await userModel.create(userData); 
                res.status(201).json({ success: true, data: newUser }); 
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0]?.email_address || '', 
                    firstName: data.first_name || '', 
                    lastName: data.last_name || '', 
                    photo: data.image_url || '' 
                };

                // Update the user in the database
                const updatedUser = await userModel.findOneAndUpdate(
                    { clerkId: data.id }, 
                    userData,
                    { new: true } 
                );

                if (!updatedUser) {
                    throw new Error("User not found");
                }

                res.status(200).json({ success: true, data: updatedUser }); 
                break;
            }
            case "user.deleted": {
                const result = await userModel.findOneAndDelete({ clerkId: data.id }); 

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
    } catch (error) {
        console.error("Error processing webhook:", error.message); 
        res.status(500).json({ success: false, message: error.message }); 
    }
};

export {
    clerkWebhooks
};
