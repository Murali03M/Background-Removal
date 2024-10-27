import express from 'express';

import { removeBgImage } from '../controllets/imageController';
import { authUser, customAuthMiddleware } from '../middlewares/auth';
import upload from '../middlewares/multer';

const imageRouter = express.Router();

imageRouter.post(
  '/remove-bg',upload.single('image'),
  authUser,customAuthMiddleware, removeBgImage);
  


export default imageRouter;