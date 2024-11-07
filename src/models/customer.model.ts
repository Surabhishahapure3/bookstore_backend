import { Schema, model } from 'mongoose';
import { ICustomer } from '../interfaces/customerdetails.interface';

const addressSchema = new Schema({
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  isDefault: { type: Boolean, required: true, default: false },
});

const customerSchema = new Schema<ICustomer>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  addresses: {
    type: [addressSchema], // Embedding the address schema
    default: [],
  },
}, { timestamps: true });

export default model<ICustomer>('Customer', customerSchema);