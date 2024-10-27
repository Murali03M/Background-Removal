import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';


import { clerkWebhooks, rezorpayment, userCredits } from '../controllets/userControllers';
import { authUser, customAuthMiddleware } from '../middlewares/auth';


const userRouter =express.Router();


userRouter.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

userRouter.get('/credits', customAuthMiddleware as RequestHandler, userCredits);

userRouter.post('pay-razor', customAuthMiddleware as RequestHandler,rezorpayment)

export default userRouter;




// https://background-removal-six.vercel.app/api/user/webhooks
