import express, { IRouter } from 'express';
// import routes from './routes';
const router = express.Router();


import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoutes from './cart.route';
import wishlist from './wishlist.route';
import OrderRoutes from './order.route';
import CustomerRoutes from './customer.route'; 
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  // router.use('/admin',new userRoute().getRoutes());
  router.use('/books', new bookRoute().getRoutes());
  router.use('/cart', new cartRoutes().getRoutes());
  router.use('/wishlist',new wishlist().getRoutes())
  router.use('/orders', new OrderRoutes().getRoutes());
  router.use('/customers', new CustomerRoutes().getRoutes()); 
 

  return router;
};

export default routes;
