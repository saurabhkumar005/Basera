import Listing from '../models/Listing.js'

 export const getListing = async(req, res)=>{
    try{
        const listings = await Listing.find().lean();
        res.json(listings);
    }
    catch(err){
        //always send status code with errors, it helps in debugging errors in client side
        //500 is the error code for internal server error(generic code for all types of backend error)
        res.status(500).json({message : err.message});
    }
}

export const addListing = async(req,res)=>{
    //taking all  detaills for new listing from from post body and creating new document of Listing with these data
    const owner = req.user.userId;
    const newListing = new Listing({...req.body, owner});
    try{
        //saving new listing to DB
        const savedListing = await newListing.save();
        res.status(201).json(newListing);
        //201 status code means created (i.e whatever you are trying to create is created)
    }catch(err){
        //400 status code means bad request (eg. missing title)
        res.status(400).json({message : err.message});
    }
}
export const updateListing = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const listingId = req.params.id;
        const listing = await Listing.findById(listingId);
        
        if(!listing){
            return res.status(404).json({message: "Listing not found"});
        }

        if(listing.owner.toString()!==userId){
            return res.status(403).json({message: "Access Denied! You are noot the owner of this listing."});
        }
        //run  validators validates that all updates are according to the schemas rules
        const updatedListing = await Listing.findByIdAndUpdate(listingId, {$set : req.body}, {runValidators: true, new : true});
         res.status(200).json({message : "Listing Updated Successfully!", listing : updatedListing});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const deleteListing = async(req, res)=>{
    try{
        const listingId = req.params.id;
        const userId = req.user.userId;
        const listing = await Listing.findById(listingId);
        if(!listing){
            return res.status(404).json({message: "Listing Not Found!"});
        }
        if(listing.owner.toString()!==userId){
            return res.status(403).json({message : "Access Denied! You are not owner of this listing."})
        }
        await Listing.findByIdAndDelete(listingId);
        res.status(200).json({message : `${listing.title} Deleted Successfully!`});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export const getMyListing = async(req, res)=>{
    try{
        const userId = req.user.userId;
        let listings = await Listing.find({owner : userId}).lean();
        if(listings.lengths===0){
            return req.status(200).json({message : "You have not added any listing till now!"});
        }
        res.status(200).json({listings});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}