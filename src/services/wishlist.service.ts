// services/wishlist.service.ts
import { Types } from 'mongoose';
import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';
import { IWishlist } from '../interfaces/wishlist.interface';

class WishlistService {
    async add(userId: string, bookId: string): Promise<IWishlist> {
        const userObjectId = Types.ObjectId(userId);
        const bookObjectId = Types.ObjectId(bookId);
        console.log('Creating wishlist for user:', userId);
        const book = await Book.findById(bookObjectId);
        if (!book) {
            throw new Error('Book not found');
        }

        let wishlist: IWishlist | null = await Wishlist.findOne({ createdBy: userObjectId });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                createdBy: userObjectId,
                books: [{ 
                    bookId: bookObjectId,
                    description: book.description,
                    price: book.price,
                    author: book.author,
                    image: book.bookImage,
                    bookName:book.bookName
                }],
            });
        } else {
            // Check if the book is already in the wishlist
            const bookInWishlist = wishlist.books.find(item => item.bookId.toString() === bookObjectId.toString());
            if (!bookInWishlist) {
                wishlist.books.push({
                    bookId: bookObjectId,
                    description: book.description,
                    price: book.price,
                    author: book.author,
                    image: book.bookImage,
                    bookName:book.bookName,
                    length: function (): unknown {
                        throw new Error('Function not implemented.');
                    }
                });
                await wishlist.save();
            }
        }

        return wishlist;
    }

    async remove(userId: string, bookId: string): Promise<IWishlist | null> {
        const userObjectId = Types.ObjectId(userId);
        const bookObjectId = Types.ObjectId(bookId);

        const wishlist = await Wishlist.findOne({ createdBy: userObjectId });

        if (wishlist) {
            wishlist.books = wishlist.books.filter(item => item.bookId.toString() !== bookObjectId.toString());
            await wishlist.save();
            return wishlist;
        }

        return null; // Wishlist not found
    }

    async get(userId: string): Promise<IWishlist | null> {
        const userObjectId = Types.ObjectId(userId);
        return await Wishlist.findOne({ createdBy: userObjectId }).populate({
            path: 'books.bookId', 
            model: 'Book', 
            select: ' description price author bookImage bookName', 
        });
    }
}

export default new WishlistService();
