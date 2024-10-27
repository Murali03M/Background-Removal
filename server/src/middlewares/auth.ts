import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import  { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

import jwt from 'jsonwebtoken';

// Define the extended request type
interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
  };
  body: {
    clerkId?: string;
    headers?: string;
  };
}

export const authUser = ClerkExpressWithAuth();

export const customAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      
        console.log("CALLING THE MIDDLWQsew");
        
    // Get token from authorization header instead of body
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided'
      });
      return;
    }

    try {
      const decoded = jwt.decode(token);
      
      if (!decoded || typeof decoded === 'string') {
        res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
        return;
      }

      // Type assertion for decoded token
      req.body.clerkId = (decoded as { clerkId: string }).clerkId;
      next();
    } catch (jwtError) {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
      return;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};