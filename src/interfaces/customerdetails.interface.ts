import { Document, ObjectId } from 'mongoose';

interface IAddress {
  _id: ObjectId;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ICustomer extends Document {
  _id: ObjectId;
  email: string;
  fullName: string;
  contact: number;
  addresses: IAddress[];  
}