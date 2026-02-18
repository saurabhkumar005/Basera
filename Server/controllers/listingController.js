import Listing from '../models/Listing.js'
import uploadToCloudinary from '../utils/cloudinary.js';
export const getListing = async (req, res) => {
    try {
        const listings = await Listing.find().lean();
        // console.log(listings);
        res.json(listings);
    }
    catch (err) {
        //always send status code with errors, it helps in debugging errors in client side
        //500 is the error code for internal server error(generic code for all types of backend error)
        res.status(500).json({ message: err.message });
    }
}
export const getListingById = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate("owner", "name email phone");
        if (!listing) return res.status(404).json({ message: "Listing not found!" });
        res.status(200).json(listing);
    } catch (error) {
        console.error("Error fetching listing By id from server:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addListing = async (req, res) => {

    try {
        const { contactNumber } = req.body;

        if (!/^\d+$/.test(contactNumber)) {
            return res.status(400).json({
                message: "Invalid contact number. It must contain only digits (0-9)."
            });
        }

        if (contactNumber.length < 10 || contactNumber.length > 15) {
            return res.status(400).json({
                message: "Contact number should be of minimum length 10."
            });
        }

        // if no photos exist , return with error
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one property image is required." });
        }

        // uploading image to cloudinary
        const uploadFiles = req.files.map(file => uploadToCloudinary(file.buffer));

        //waiting for all upload to finish before continuing
        const uploadRes = await Promise.all(uploadFiles);

        //extracting secure_url from all photo upload result
        const imageUrls = uploadRes.map(res => res.secure_url);

        //taking all  detaills for new listing from from post body and creating new document of Listing with these data
        const newListing = new Listing({ ...req.body, owner: req.user.userId, listingPhotos: imageUrls });

        //saving new listing to DB
        const savedListing = await newListing.save();

        res.status(201).json(savedListing);
        //201 status code means created (i.e whatever you are trying to create is created)
    } catch (err) {
        //400 status code means bad request (eg. missing title)
        // 500 = Internal Server Error (Database or Cloudinary failed)
        res.status(500).json({ message: "Failed to create listing", error: err.message });
    }
}


export const updateListing = async (req, res) => {
    try {
        const userId = req.user.userId;
        const listingId = req.params.id;
        const listing = await Listing.findById(listingId);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.owner.toString() !== userId) {
            return res.status(403).json({ message: "Access Denied! You are noot the owner of this listing." });
        }
        //run  validators validates that all updates are according to the schemas rules
        const { owner, ...updatedData } = req.body();
        const updatedListing = await Listing.findByIdAndUpdate(listingId, { $set: updatedData }, { runValidators: true, new: true });
        res.status(200).json({ message: "Listing Updated Successfully!", listing: updatedListing });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const userId = req.user.userId;
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing Not Found!" });
        }
        if (listing.owner.toString() !== userId) {
            return res.status(403).json({ message: "Access Denied! You are not owner of this listing." })
        }
        await listing.deleteOne();
        res.status(200).json({ message: `${listing.title} Deleted Successfully!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export const getMyListing = async (req, res) => {
    try {
        const userId = req.user.userId;
        let listings = await Listing.find({ owner: userId }).lean();
        if (listings.length === 0) {
            return res.status(200).json({ message: "You have not added any listing till now!" });
        }
        res.status(200).json({ listings });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const countMyListing = async (req, res) => {
    try {
        const id = req.user.userId;
        const totalListing = await Listing.countDocuments({ owner: id })
        res.status(200).json({ count: totalListing });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}