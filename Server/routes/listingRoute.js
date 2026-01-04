import express from 'express'
import { getListing, addListing, deleteListing, updateListing, getMyListing, getListingById } from '../controllers/listingController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router();
//we use  express.Router() to use express app in separate files for separate routes


//this will find and return all listing available in our database
router.get('/', getListing)
router.get('/:id', getListingById);

//when API is called which have middleware attached , 
// A request hits /api/listings -> // Express runs authMiddleware before the controller.
// If token is valid → proceeds to addListing().
// If token is missing/invalid → stops there and sends 401/403.
router.get('/myListing', authMiddleware, getMyListing);
router.post('/', addListing);
router.delete('/:id',authMiddleware,deleteListing);
//using put to update because , patch is used to update some part of document(Used for small updates (like changing one or two fields). )
//  where as put is used to replace whole doocument(Used when you want to send all fields (complete object update))

router.put('/:id', authMiddleware, updateListing);

// exporting our mini app for specific listing routes 
export default router;





