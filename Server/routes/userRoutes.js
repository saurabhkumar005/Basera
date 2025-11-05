import express from 'express';
import {addFavourites, removeFavourites, getFavourites} from '../controllers/userController.js'
import {verifyToken as authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/favourites/',authMiddleware, getFavourites);

router.post('/favourites/:id', authMiddleware, addFavourites);

router.delete('/favourites/:id',authMiddleware,removeFavourites);

export default router;