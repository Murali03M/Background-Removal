import express from 'express';

import { clerkWebhooks } from '../controllets/userControllers.ts';


const userRouter =express.Router();


userRouter.post('/webhooks', clerkWebhooks);

export default userRouter;





