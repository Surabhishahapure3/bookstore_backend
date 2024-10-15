import HttpStatus from 'http-status-codes';
import cartService from '../services/cart.services';
import { Request, Response, NextFunction } from 'express';

class CartController {
  public CartService = new cartService();
 
  public getAllItemFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId: string = req.body.userId;
      const data = await this.CartService.getAllItemsFromCart(userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Retrieved items from cart successfully'
      });
    } catch (error) {
      next(error); 
    }
  };

  public addToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookId: string = req.params.id;
      const userId: string = res.locals.userId;
      console.log("book Id",bookId);
      console.log("userId",userId);
      const data = await this.CartService.addItemToCart(bookId, userId);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data,
        message: 'Book added to cart successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public removeFromCart = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        const bookId: string = req.params.id;
        const userId: string = req.body.userId;
        const data = await this.CartService.removeItemFromCart(bookId, userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data,
            message: 'Book removed from cart successfully'
        });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
        });
    }
  };

  public updateQuantity = async(req: Request, res: Response, next:NextFunction):Promise<void>=>{
    try{
        const { bookId, userId, quantity } = req.body;
        const data = await this.CartService.updateBookQuantity(bookId, userId, quantity);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data,
            message: 'Book quantity updated successfully'
          });
    }
    catch(error){
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: error.message
          });
    }
  };

}

export default CartController;