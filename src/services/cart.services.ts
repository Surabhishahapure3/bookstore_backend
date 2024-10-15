import Cart from '../models/cart.model';
import Book from '../models/book.model';
import { ICart, ICartBook } from '../interfaces/cart.interface';
import mongoose from 'mongoose';

class CartService {
  public getAllItemsFromCart = async (
    userId: string
  ): Promise<ICart | null> => {
    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!cart || cart.books.length === 0) {
      throw new Error('No items found in the cart for this user');
    }

    return cart;
  };

  public addItemToCart = async (
    bookId: string,
    userId: string
  ): Promise<ICart> => {
    const book = await Book.findById(bookId);
    console.log("book",book)

    if (!book) {
      throw new Error('Book not found');
    }

    let cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!cart) {
      const newCart: Partial<ICart> = {
        userId: new mongoose.Types.ObjectId(userId),
        books: [
          {
            bookName: book.bookName,
            description: book.description,
            price: book.price,
            discountPrice: book.discountPrice,
            bookImage: book.bookImage,
            quantity: 1,
            author: book.author,
            userId: new mongoose.Types.ObjectId(userId)
          } as ICartBook
        ],
        totalPrice: book.price,
        totalDiscountPrice: book.discountPrice
      };

      cart = new Cart(newCart);
    } else {
      const bookInCart = cart.books.find(
        (cartBook: ICartBook) => cartBook.bookName === book.bookName
      );

      if (bookInCart) {
        bookInCart.quantity += 1;
      } 
      else {
        cart.books.push({
          bookName: book.bookName,
          description: book.description,
          price: book.price,
          discountPrice: book.discountPrice,
          bookImage: book.bookImage,
          quantity: 1,
          author: book.author,
          userId: new mongoose.Types.ObjectId(userId)
        } as ICartBook);
      }

      cart.totalPrice += book.price;
      cart.totalDiscountPrice += book.discountPrice;
    }
    await cart.save();
    return cart;
  };

  public removeItemFromCart = async (
    bookId: string,
    userId: string
  ): Promise<ICart> => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.books = cart.books.filter(
      (book: ICartBook) => book._id.toString() !== bookId
    );
    cart.totalPrice = cart.books.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
    cart.totalDiscountPrice = cart.books.reduce(
      (total, book) => total + book.discountPrice * book.quantity,
      0
    );
    await cart.save();
    return cart;
  };

  public updateBookQuantity = async (
    bookId: string,
    userId: string,
    quantity: number
  ): Promise<ICart> => {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const bookInCart = cart.books.find(
      (book: ICartBook) => book._id.toString() === bookId
    );
    if (!bookInCart) {
      throw new Error('Book not found in cart');
    }
    bookInCart.quantity = quantity;
    cart.totalPrice = cart.books.reduce(
      (total, book) => total + book.price * book.quantity,
      0
    );
    cart.totalDiscountPrice = cart.books.reduce(
      (total, book) => total + book.discountPrice * book.quantity,
      0
    );

    await cart.save();
    return cart;
  };
}

export default CartService;