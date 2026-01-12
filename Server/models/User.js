import mongoose from 'mongoose'
import  bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type: String, required : true, unique : true, lowercase: true, trim : true},
    password : {type: String, required : true, trim: true},
    phone :  {type : String, required: true, trim : true },
    avatarUrl : {type: String},
    favourites : [{type : mongoose.Schema.Types.ObjectId, ref : 'Listing' }]
    
}, {timestamps : true});

// SchemaName.pre() is a mongo hook/middleware which runs before the mentioned operation ('save' here) 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
    //salt is random string added to the password before hashing and gensalt(x) generates it , 
    // the more value of x makes it more harder to crack but takes more times , which eventually makes  password fetching from DB slower
    const salt = await bcrypt.genSalt(10);
    //bcrypt.hash(password, salt) hash the password according to salt value
    this.password =  await bcrypt.hash(this.password,salt);
    next();
    }catch(err){
        return  next(err);
    }
})


      //check for valid email id here and valid password once



export default mongoose.model('User', userSchema);