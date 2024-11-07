import { Request, Response } from 'express';
import CustomerService from '../services/customer.service';

class CustomerController {
  private customerService = new CustomerService();

  // Get customer details
  public getCustomerDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, fullName } = req.query; // Fetch email and fullName from query params
      const customer = await this.customerService.getCustomerDetails(email as string, fullName as string); // Fetch customer details
      
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Add new customer
  public addCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerData = req.body; // Extract customer data from request body
      const customer = await this.customerService.addCustomer(customerData); // Add new customer
      return res.status(201).json(customer); // Respond with newly created customer
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Add address to customer
  public addAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerId = req.params.id; // Extract customer ID from URL params
      const address = req.body; // Extract address from request body
      const updatedCustomer = await this.customerService.addAddress(customerId, address); // Add address to customer
      return res.status(200).json(updatedCustomer); // Respond with updated customer
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default CustomerController;