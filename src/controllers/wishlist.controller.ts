// controllers/wishlist.controller.ts
import { Request, Response } from 'express';
import WishlistService from '../services/wishlist.service';

class WishlistController {
    constructor() {}

    async add(req: Request, res: Response) {
        try {
            const userId = res.locals.userId // Assuming userId is passed in the body
            const bookId = req.params.bookId; // bookId is passed in URL params
            console.log('Attempting to add book to wishlist for user:', userId);
            const wishlist = await WishlistService.add(userId, bookId);
            console.log('Wishlist after adding:', wishlist);
            return res.status(201).json({
                code: 201,
                data: wishlist,
                message: 'Book added to wishlist successfully',
            });
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const userId = res.locals.userId; // Assuming userId is passed in the body
            const bookId = req.params.bookId; // bookId is passed in URL params

            const wishlist = await WishlistService.remove(userId, bookId);
            if (wishlist) {
                return res.status(200).json({
                    code: 200,
                    data: wishlist,
                    message: 'Book removed from wishlist successfully',
                });
            } else {
                return res.status(404).json({ code: 404, message: 'Wishlist not found' });
            }
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const userId = res.locals.userId;
            console.log('userId in controller:', userId);

            const wishlist = await WishlistService.get(userId);
            console.log('Retrieved wishlist:', wishlist);
            if (wishlist) {
                return res.status(200).json({
                    code: 200,
                    data: wishlist,
                    message: 'Wishlist retrieved successfully',
                });
            } else {
                return res.status(404).json({ code: 404, message: 'Wishlist not found' });
            }
        } catch (error) {
            return res.status(500).json({ code: 500, message: error.message });
        }
    }
}

export default WishlistController; 
