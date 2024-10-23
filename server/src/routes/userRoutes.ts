import express from 'express';
import bodyParser from 'body-parser';


import { clerkWebhooks } from '../controllets/userControllers';


const userRouter =express.Router();


userRouter.post('/webhooks', bodyParser.raw({ type: 'application/json' }),clerkWebhooks);

export default userRouter;





