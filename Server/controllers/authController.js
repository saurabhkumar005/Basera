import User from '../models/User.js'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import uploadToCloudinary from '../utils/cloudinary.js';
import mongoose from 'mongoose' 


//register a new user
const register = async(req, res)=>{
    try{
        const {name, password, email, phone} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists! Login Please..."})
        };
        const newUserId = new mongoose.Types.ObjectId();
        let avatarUrl="";
        if(req.file){
            const fileName = `avatar_${newUserId}`
            const uploadResult = await uploadToCloudinary(req.file.buffer, fileName);
            avatarUrl = uploadResult.secure_url;
        }
        const newUser = new User({_id: newUserId, name, email, password, avatarUrl, phone });
        await newUser.save();
        res.status(201).json({message : 'User registered successfully'});

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    
};

//login existing users
const login = async(req, res)=>{
    try{
        const {email,  password} = req.body;
        const user = await User.findOne({email});

        //check if user exist in our DB
        if(!user){
            return res.status(404).send({message: "User Email ID not Registered, Please Register First"});
        }
        
        //check if user password matches from our DB
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({message: 'Wrong password, Please Enter Correct Password'})
        }
        const payload = {userId : user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1d'});
        res.json({token});


    }catch(err){
        res.status(500).json({message : err.message});
    }
}
export {register, login};
