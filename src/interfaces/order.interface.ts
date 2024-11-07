import mongoose, { Document } from 'mongoose';
import { ICartBook } from './cart.interface'; 

export interface IOrder extends Document {
  orderId: mongoose.Types.ObjectId;
  books: ICartBook[];
  totalPrice: number;
  totalDiscountPrice: number;
  orderStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}