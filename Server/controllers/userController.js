import Listing from '../models/Listing.js'
import User from '../models/User.js'




//get all my favorite listing
const getFavourites = async(req, res)=>{
    try{
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('favourites');
    if(!user){
        return res.status(404).json({message : "No user found! Please register"});
    }
    if(user.favourites.length===0){
        return res.status(200).json({message: "No Favourites yet!"});
    }
    res.status(200).json(user.favourites);
}catch(err){
    res.status(500).json({message: err.message});
}
}

//add to favourites
const addFavourites = async(req, res)=>{
    try{
        const userId = req.user.userId;
        const listingId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "No user found! Please register"});
        }
        const listing = await Listing.findById(listingId);
        if(!listing){
            return res.status(404).json({message : "No such Listing exist in our database!"});
        }
        const userFav = user.favourites;
        //addInSet will add data only if it was not there previously (i.e, avoid data duplicacy)
        const favAdded = await User.findByIdAndUpdate(userId, {$addToSet : {favourites:listingId}}, {new : true});
        res.status(200).json({message: "Listing added to favourites successfully!", favourites: favAdded.favourites});

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//remove favouriites
const removeFavourites = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const listingId = req.params.id;
        const user = await User.findById(userId);
         if(!user){
            return res.status(404).json({message : "No user found! Please register"});
        }
        const updated = await User.findByIdAndUpdate(
            userId, 
            {$pull : {favourites : listingId}},
            {new : true}
        ).populate("favourites");
        res.status(200).json({message: "Listing removed from favourites!", favourites: updated.favourites});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
