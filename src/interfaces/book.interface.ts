import mongoose, { Document } from 'mongoose';

export interface IBook extends Document {
  bookName: string;
  author: string;
  description: string;
  price: number;
  discountPrice: number;
  bookImage: string;
  quantity: number;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}