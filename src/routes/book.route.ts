import express, { IRouter } from 'express';
import BookController from '../controllers/book.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import {roleMiddleware} from '../middlewares/role.middleware'

class BookRoutes {
  private bookController = new BookController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('', this.bookController.getAllBooks);
    this.router.get('/:bookId',this.bookController.getBookById);

    this.router.put('/:bookId',userAuth,roleMiddleware,this.bookController.updateBook);
    this.router.delete('/:bookId',userAuth,roleMiddleware,this.bookController.deleteBook);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default BookRoutes;
