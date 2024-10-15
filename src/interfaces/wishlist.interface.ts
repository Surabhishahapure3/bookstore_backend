// interfaces/cart.interface.ts
import { Types } from 'mongoose';

export interface IWishlist {
    description: string;
    price: number;
    author: string;
    bookImage: string;
    save(): unknown;
    _id: Types.ObjectId;
    createdBy: Types.ObjectId; // Ensure createdBy is Types.ObjectId
    books: {
        length(): unknown;
        bookId: Types.ObjectId; // Ensure bookId is also Types.ObjectId
        description: string;
        price: number;
        author: string;
        image?: string;
        bookName:string;
    }[];
}
