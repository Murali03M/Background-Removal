import { Request, RequestHandler, Response } from "express";
import userModel from "../models/userModel";
import { Webhook } from "svix";
import razorpay from "razorpay";
import transcationModel from "../models/transactionModel";

const clerkWebhooks = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Webhook received.");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

    // Verify the webhook signature using raw body
    const svixId = req.headers["svix-id"] as string;
    const svixSignature = req.headers["svix-signature"] as string;
    const svixTimestamp = req.headers["svix-timestamp"] as string;

    if (!svixId || !svixSignature || !svixTimestamp) {
      throw new Error("Missing required Svix headers for webhook verification");
    }

    // Verify the webhook signature
    whook.verify(JSON.stringify(req.body), {
      "svix-id": svixId || "",
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
          email: data.email_addresses[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };

        // Create the user in the database
        const newUser = await userModel.create(userData);
        res.status(201).json({ success: true, data: newUser });
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address || "",
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
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
        res
          .status(400)
          .json({ success: false, message: "Unhandled webhook type" });
        break;
      }
    }
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get the user creidts

const userCredits: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

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
  } catch (error) {
    console.error("Error fetching user credits:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const rezorpayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clerkId, planId } = req.body;

    if (!clerkId) {
      res.status(400).json({
        success: false,
        message: "Clerk ID is required",
      });
      return;
    }
    const userData = await userModel.findOne({ clerkId });

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
          
      }
      
      const newTransaction = await transcationModel.create(transcationData);

      const options = {
          
          amount: amount * 100,
          currency: process.env.CURRENCY,
          

          
      }

      await razorpayInstance.orders.create(options, (error, order) => {
          if (error)
          {
              res.status(500).json({ success: false, message: error });
              return;
               
          }
          
          res.status(200).json({ success: true, data: order });
      })
      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
    return;
  }
};

export { clerkWebhooks, userCredits , rezorpayment};
