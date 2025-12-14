import User from '../models/User'
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
//register a new user
const register = async(req, res)=>{
    try{
        const {name, password, email, avatarUrl, phone, favourites} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"})
        };

        let newUser = new User({name, email, password, avatarUrl, phone, favourites });
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
            return res.status(404).send({message: "User Email ID not Registered, Please Register First!"});
        }
        
        //check if user password matches from our DB
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({message: 'Invalid Credentials!, Please Enter Correct Credential.'})
        }
        const payload = {userId : user._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '1d'});
        res.json({token});


    }catch(err){
        res.status(500).json({message : err.message});
    }
}
export {register, login};
