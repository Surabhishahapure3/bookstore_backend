import { IUser } from './interfaces/user.interface'; // Adjust the import path to your IUser interface

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Add the user property
    }
  }
}
