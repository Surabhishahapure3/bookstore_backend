import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import orderController from '../controllers/order.controller';

class OrderRoutes {
  private OrderController = new orderController();
  private router = express.Router();
  constructor() {
    this.routes();
  }
 
  private routes = () => {
    this.router.post('/', userAuth, this.OrderController.createOrder);
    this.router.get('/', userAuth, this.OrderController.getAllOrders);
    this.router.get('/:id', userAuth, this.OrderController.getOrderSummary);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default OrderRoutes;