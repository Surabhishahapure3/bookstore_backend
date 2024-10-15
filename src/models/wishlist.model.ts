// models/wishlistModel.ts
import { Schema, model } from 'mongoose';
import { IWishlist } from '../interfaces/wishlist.interface';

const WishlistSchema = new Schema<IWishlist>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    books: [{ 
        bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
        description: { type: String, required: true },
            price: { type: Number, required: true },
            author: { type: String, required: true },
            image: { type: String },
            bookName:{type:String}
     }],
}, {
    timestamps: true,
});

const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;
