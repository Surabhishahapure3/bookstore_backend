import Customer from '../models/customer.model';
import { ICustomer } from '../interfaces/customerdetails.interface';

class CustomerService {
  // Fetch customer details
  public getCustomerDetails = async (email: string, fullName: string): Promise<ICustomer | null> => {
    const query: any = {}; // Dynamic query object
    
    if (email) query.email = email;
    if (fullName) query.fullName = fullName;

    const customer = await Customer.findOne(query); // Find customer by email or full name
    return customer;
  };

  // Add new customer
  public addCustomer = async (customerData: ICustomer): Promise<ICustomer> => {
    const customer = new Customer(customerData); // Create new customer instance
    return await customer.save(); // Save customer to database
  };

  // Add an address to the customer's profile
  public addAddress = async (customerId: string, address: any): Promise<ICustomer | null> => {
    const customer = await Customer.findById(customerId); // Find customer by ID
    if (!customer) {
      throw new Error('Customer not found');
    }
    customer.addresses.push(address); // Add new address to the customer's address list
    return await customer.save(); // Save updated customer with new address
  };
}

export default CustomerService;