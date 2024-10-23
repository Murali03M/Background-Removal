import { Request, Response } from 'express'; 
import userModel from '../models/userModel.ts'; 
import { Webhook } from 'svix'; 

const clerkWebhooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');
        
        // Verify the webhook
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string
        });

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
                    lastname: data.last_name || '', 
                    photo: data.image_url || '' 
                }

                await userModel.create(userData); 
                res.status(201).json({ success: true }); 
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0]?.email_address || '', 
                    firstName: data.first_name || '', 
                    lastname: data.last_name || '', 
                    photo: data.image_url || '' 
                }

                const updatedUser = await userModel.findOneAndUpdate(
                    { clerkId: data.id }, 
                    userData,
                    { new: true } 
                );

                if (!updatedUser) {
                    throw new Error("User not found");
                }

                res.status(200).json({ success: true }); 
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
        console.log(error.message); 
        res.status(500).json({ success: false, message: error.message }); 
    }
}

export {
    clerkWebhooks
}
