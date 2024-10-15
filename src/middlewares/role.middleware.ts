import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user; // User is set by userAuth middleware

  // If the user is not authenticated or role is missing
  if (!user || !user.role) {
    return res.status(403).json({
      message: 'User not authenticated or role not found',
    });
  }

  const path = req.path;
  const method = req.method;

  // Block admin from accessing any cart routes
  if (user.role === 'admin') {
    if (method === 'PUT' || method === 'DELETE') {
      return next();
    }
  }

  // Allow users to access cart-related routes
  if (user.role === 'user') {
    // Allow GET for retrieving the cart
    if (method === 'GET') {
      return next();
    }

    // Allow POST to add a book to the cart
    if (method === 'POST' && req.params.bookId) { // Match /:bookId
      return next();
    }

    // Allow DELETE for removing the entire cart or a book from the cart
    if (method === 'DELETE' && req.path === '/delete') {
      return next();
    }

    if (method === 'DELETE' && req.params.bookId) { // Match /delete/:bookId
      return next();
    }
  }

  // If the user does not have sufficient permissions
  return res.status(403).json({
    message: 'Access denied: You do not have permission to perform this action',
  });
};







