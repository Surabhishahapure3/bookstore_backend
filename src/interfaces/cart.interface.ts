import mongoose, { Document } from 'mongoose';

export interface ICartBook {
  _id: mongoose.Types.ObjectId;
  bookName: string;
  description: string;
  price: number;
  discountPrice: number;
  bookImage: string;
  quantity: number;
  author: string;
  userId: mongoose.Types.ObjectId;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  books: ICartBook[];
  totalPrice: number;
  totalDiscountPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}