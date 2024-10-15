/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log('Authorization Header:', req.headers['authorization']);
    const bearerToken = req.header('Authorization');

    // Check if the token exists
    if (!bearerToken) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Authorization token is required',
      });
    }

    const token = bearerToken.split(' ')[1]; // Extract the token

    // Verify the token
    const user: any = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded user in middleware:', user); 

    // Check if the user is successfully decoded
    if (!user || !user.role) { // Ensure role exists in the token
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid or expired token or missing role',
      });
    }

    // Set user data to request and response locals
    req.user = user;
    res.locals.user = user;  // Make user available in other middlewares
    res.locals.userId = user.id;
    
    req.body.createdby = user.id;  // Set the created by field
    res.locals.createdby = user.id; // Store created by in response locals
    res.locals.token = token; // Store the token in response locals

    console.log('Authenticated user:', user.id);
    next();  // Proceed to the next middleware
  } catch (error) {
    console.error('Error in userAuth middleware:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Authentication error',
    });
  }
};
