import express from 'express'
import Listing from '../models/Listing.js'

const router = express.Router();
//we use  express.Router() to use express app in separate files for separate routes


//this will find and return all listing available in our database
router.get('/',async(req, res)=>{
    try{
        const listings = await Listing.find();
        res.json(listings);
    }
    catch(err){
        //always send status code with errors, it helps in debugging errors in client side
        //500 is the error code for internal server error
        res.status(500).json({message : err.message});
    }
})

//ADDING NEW LISTING TO DB
router.post('/',async(req,res)=>{
    //taking all  detaills for new listing from from post body and creating new document of Listing with these data
    const newListing = new Listing(req.body);
    try{
        //saving new listing to DB
        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
        //201 status code means created (i.e whatever you are trying to create is created)
    }catch(err){
        //400 status code means bad request (eg. missing title)
        res.status(400).json({message : err.message});
    }
} )

// exporting our mini app for specific listing routes 
export default router;





