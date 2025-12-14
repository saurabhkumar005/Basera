import Listing from '../models/Listing.js'
import User from '../models/User.js'


//data that is to showed to public profile (can be seen by anyone, so no personal data), should be sended by this
export const publicProfile = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("name avatarUrl createdAt").lean();
        if(!user){return res.status(404).json({message: "User not found! Please refresh or see other user profile and if error keep coming, Contact us."})}
        //.lean() convert data into plain javscript/json , i.e, no more backend mongoose object and no more load on backend
        const userListing = await Listing.find({owner: id}).lean();
        //Listing. find() will return array , either null or with some listing
        res.status(200).json({user, listing : userListing});


    }catch(err){
        res.status(500).json({message : err.message});
    }
}

//show user profile , only to his orginal owner
export const getProfile = async(req, res)=>{
    try{
        const userId = req.user.userId;
        const user =  await User.findById(userId).select('-password').lean();
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }

}

//update user profile details
export const updateProfile = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        const data = req.body;
        delete data.password;
        delete data.email;
        delete data.favourites;
        delete data._id;

        const updatedData = await User.findByIdAndUpdate(userId,{$set : data}, {runValidators : true, new : true}).select('-password');

        res.status(200).json(updatedData);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}



//get all my favorite listing
export const getFavourites = async(req, res)=>{
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
export const addFavourites = async(req, res)=>{
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
export const removeFavourites = async(req,res)=>{
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
