/*
import express, { IRouter } from 'express';
import {OrderController} from '../controllers/ordersum.controller';
// import {OrderService} from '../services/Ordersum.service'
import { userAuth } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

class OrdersummaryRoutes {
  
  private router = express.Router();
  // private orderService = new OrderService();  // Create an instance of OrderService
private orderController = new OrderController(this.orderService); 

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('/add/:bookId', userAuth, this.orderController.createOrder.bind(this.orderController));
    // this.router.get('/', userAuth, this.orderController.getOrders);
    // this.router.get('/:id', userAuth, this.orderController.getOrderById);
    // this.router.delete('/:id', userAuth, this.orderController.deleteOrder);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default OrdersummaryRoutes;
*/