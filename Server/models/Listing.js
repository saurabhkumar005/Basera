import mongoose from 'mongoose'

const listingSchema= mongoose.Schema({
    title : {type: String, required: true},
    listingType : {type : String, required: true},
    city : {type: String, required: true, index: true},
    address : {type: String, required: true},
    price : {type: Number, required: true},
    sharingType : {type : String, required : true},
    amenities : [String],
    rules: [String],
    contactNumber : String,
    owner : { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: false}
}, {timestamps : true });
//timestamps : true will store createdAt and updatedAt times

//mongoose model is table in sql
//so , as we have used mongoose.model command, we are creating table in mongoDB

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;