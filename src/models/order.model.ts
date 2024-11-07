import mongoose, { Schema, model } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    books: {
      type: [
        {
          bookName: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          discountPrice: { type: Number, required: true },
          bookImage: { type: String, required: false },
          quantity: { type: Number, required: true },
          author: { type: String, required: true },
        }
      ],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscountPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

export default model<IOrder>('Order', orderSchema);