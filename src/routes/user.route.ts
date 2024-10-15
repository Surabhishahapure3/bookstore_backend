import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import {roleMiddleware} from '../middlewares/role.middleware'

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // Route to get all users (accessible by admin)
    // this.router.get('', roleMiddleware, this.UserController.getAllUsers);

    
    this.router.post(
      '/register',
      this.UserValidator.register,
      this.UserController.newUser
    );

    
    this.router.post(
      '/login',
      this.UserValidator.emailValidate,
      this.UserController.loginUser
    );
    this.router.post(
      '/adminsignup',
      roleMiddleware,
      this.UserValidator.register,
      this.UserController.newUser
    )

    
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
