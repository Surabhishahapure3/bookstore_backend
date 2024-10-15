import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import cartController from '../controllers/cart.controller';

class CartRoutes {
  private CartController = new cartController();
  private router = express.Router();
  constructor() {
    this.routes();
  }

  private routes = () => {

     //Update Quantity
     this.router.post(
        '/updatequantity',
        userAuth,
        this.CartController.updateQuantity
      );
      
    //Get all items from cart
    this.router.get('/:id', userAuth, this.CartController.getAllItemFromCart),
      //Add item to cart
      this.router.post('/:id', userAuth, this.CartController.addToCart);

    //Delete item from cart
    this.router.delete('/:id', userAuth, this.CartController.removeFromCart);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;