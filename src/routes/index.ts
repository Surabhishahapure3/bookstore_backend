import express, { IRouter } from 'express';
const router = express.Router();


import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoutes from './cart.route';
import wishlist from './wishlist.route';
// import ordersummary from './ordersummary.route'

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
  // router.use('/ordersummary',new ordersummary().getRoutes())
 

  return router;
};

export default routes;
