import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import CustomerController from '../controllers/customer.controller';

class CustomerRoutes {
  public customerController = new CustomerController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = (): void => {

     //Add new customer
     this.router.post('/', userAuth, this.customerController.addCustomer);

     //Get customer details
     this.router.get('/', userAuth, this.customerController.getCustomerDetails);
     
     //Add address
     this.router.post('/:id', userAuth, this.customerController.addAddress);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CustomerRoutes;