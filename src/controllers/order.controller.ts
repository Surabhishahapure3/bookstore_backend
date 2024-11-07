import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/order.service';
import CartService from '../services/cart.services';

class OrderController {
  private orderService = new OrderService();
  private cartService = new CartService();

  public createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const customerId = res.locals.userId;
      const data = await this.orderService.createOrder(customerId);
      return res.status(201).json({
        code: 201,
        message: 'Order created successfully',
        data
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const customerId = res.locals.userId;
      const data = await this.orderService.getAllOrders(customerId);
      return res.status(200).json({
        code: 200,
        message: 'Orders retrieved successfully',
        data
      });
    } catch (error) {
      next(error);
    }
  };

  public getOrderSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const orderId = req.params.id;
      const data = await this.orderService.getOrderSummary(orderId);
      return res.status(200).json({
        code: 200,
        message: 'Order summary retrieved successfully',
        data
      });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
