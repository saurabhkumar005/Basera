import express from 'express';
import {addFavourites, removeFavourites, getFavourites, getProfile, updateProfile, publicProfile} from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/favourites/',authMiddleware, getFavourites);

router.post('/favourites/:id', authMiddleware, addFavourites);

router.delete('/favourites/:id',authMiddleware,removeFavourites);

//private profile routes, which only admin of account can see and update
router.get('/profile/', authMiddleware, getProfile);

router.put('/profile/',authMiddleware,updateProfile);

//public profile, limited Data
router.get('/:id', publicProfile );


export default router;