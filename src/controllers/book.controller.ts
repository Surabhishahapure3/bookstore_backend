/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import BookService from '../services/book.service';


import { Request, Response, NextFunction } from 'express';

class BookController {
  public bookService = new BookService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.bookService.getAllBooks();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  /*
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.loginUser(req.body);
      return res.status(data.code).json({
        code: data.code,
        data: data.data,
        message: data.message,
      });
    } catch (error) {
      next(error);
    }
  };
  */

  /**
   * Controller to get a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  /*
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  */

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  /*
  public newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.newUser(req.body);
      res.status(data.code).json({
        code: data.code,
        data:data.data,
        message: data.message
      });
    } catch (error) {
      next(error);
    }
  };
  */

  /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  /*
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.updateUser(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  */

  /**
   * Controller to delete a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  
  public getBookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    // console.log('Fetching book with ID:', req.params.bookId);
    try {
      const bookId = req.params.bookId;
      const book = await this.bookService.getBookById(bookId);

      if (!book) {
        return res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: `Book with ID ${bookId} not found`
        });
      }

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: book,
        message: 'Book fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bookId } = req.params;
      const bookData = req.body;

      const updatedBook = await this.bookService.updateBook(bookId, bookData);

      return res.status(updatedBook.code).json({
        code: updatedBook.code,
        data: updatedBook.data,
        message: updatedBook.message,
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete book method
  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bookId } = req.params;

      const deletedBook = await this.bookService.deleteBook(bookId);

      return res.status(deletedBook.code).json({
        code: deletedBook.code,
        data: deletedBook.data,
        message: deletedBook.message,
      });
    } catch (error) {
      next(error);
    }
  };
  
}

export default BookController;
