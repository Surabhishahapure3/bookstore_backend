import express, { IRouter } from 'express';
import WishlistController from '../controllers/wishlist.controller'
import { userAuth } from '../middlewares/auth.middleware';

class WishlistRoutes {
    private wishlistController = new WishlistController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {
   
    this.router.get('/add/:bookId', userAuth,this.wishlistController.add); 
    this.router.delete('/remove/:bookId', userAuth,this.wishlistController.remove);
    this.router.get('', userAuth,this.wishlistController.get);
    
    
    
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default WishlistRoutes;
