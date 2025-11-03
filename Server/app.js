import express, { urlencoded } from 'express'
// import {cors} from 'cors'
import dotenv from 'dotenv'
import cors from "cors";
import mongoose from 'mongoose'
import listingRoutes from './routes/listing.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json()); //allow server to read json data from backend
app.use(express.urlencoded({extended:true}));


//separate routes api
//we use api in route to separate and look different for backend urls from frontend url  
//it's just an industry convention to use api in url to indicate it as a backend url(for data fetch and post)
app.use('/api/listing',listingRoutes);



// DB connection
const connectDB = async function(){
    //we can also use then and catch her on promise (without async and await, but it's better way to do this(using async and await and try and catch block))
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connection success")
    }catch(err){
        console.log(`Error caught in connection to mongo: ${err}`)
    }
}
const DB = connectDB();
app.get('/',(req, res)=>{
    res.json({"data":"Backend server is working"})
})



app.listen(PORT, ()=>{console.log(`Server started on ${PORT}`)})



