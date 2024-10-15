import mongoose, { Schema, model } from 'mongoose';
import { ICart } from '../interfaces/cart.interface'; 

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    books: {
      type: [
        {
          bookName: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          discountPrice: { type: Number, required: true },
          bookImage: { type: String, required: true },
          quantity: { type: Number, required: true, default: 1 },
          author: { type: String, required: true },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        }
      ],
      required: true,
      default: [],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDiscountPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);

export default model<ICart>('Cart', cartSchema);