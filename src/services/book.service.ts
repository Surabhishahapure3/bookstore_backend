import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';
import HttpStatus from 'http-status-codes';

class BookService {
  
  // Method to get all books
  public getAllBooks = async (): Promise<IBook[]> => {
    const data = await Book.find();
    return data;
  };

  // Method to get a single book by ID
  public getBookById = async (bookId: string): Promise<IBook | null> => {
    const book = await Book.findById(bookId);
    return book; 
  };


  public updateBook = async (bookId: string, bookData: any): Promise<any> => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(bookId, bookData, { new: true });

      if (!updatedBook) {
        return {
          code: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Book not found',
        };
      }

      return {
        code: HttpStatus.OK,
        data: updatedBook,
        message: 'Book updated successfully',
      };
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Error updating book',
      };
    }
  };

  // Delete book method
  public deleteBook = async (bookId: string): Promise<any> => {
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (!deletedBook) {
        return {
          code: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Book not found',
        };
      }

      return {
        code: HttpStatus.OK,
        data: deletedBook,
        message: 'Book deleted successfully',
      };
    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Error deleting book',
      };
    }
  };
}

export default BookService;