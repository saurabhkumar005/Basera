import home1 from "../assets/images/home1.jpg"
import home2 from "../assets/images/home2.jpg"
import home3 from "../assets/images/home3.jpg"
import home4 from "../assets/images/home4.jpg"
import home5 from "../assets/images/home5.jpg"
import home6 from "../assets/images/home6.jpg"
import room1 from "../assets/images/insideHome1.jpg"
import room2 from "../assets/images/insideHome4.jpg"
import room3 from "../assets/images/insideHome3.jpg"
import room4 from "../assets/images/insideHome2.jpg"
export const  mockImages= [home1, home2, home3, home4, home5, home6, room1, room2, room3, room4];
const mockListings = [
    { _id: 1, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 5, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home3 },
    { _id: 4, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home4 },
    { _id: 6, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home2 },
    { _id: 2, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 7, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home1 },
    { _id: 3, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
      { _id: 8, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 9, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home3 },
    { _id: 10, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home4 },
    { _id: 11, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home2 },
    { _id: 12, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 14, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home1 },
    { _id: 13, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
      { _id: 15, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 16, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home3 },
    { _id: 17, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home4 },
    { _id: 18, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home2 },
    { _id: 19, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
    { _id: 20, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home1 },
    { _id: 21, title: "RK complex", price: 15000, location: "Delhi", type: "PG", image: home5 },
];



import axios from 'axios'
const api = axios.create({
  baseURL: "http://localhost:8080/api/listing"
});

const  getListings = async()=>{
  try{
    const res =  await api.get('/');
    return res.data;
  }catch(error){
    console.error("API Error in getting all listings:", error);
    return [];
  }
};

const addListing = async(listing)=>{
    try{
      const res = await api.post('/',listing);
      return res;
    }catch(err){
      console.log("Listing add failed: "+err);
      throw err;
    }
}
export default getListings;
export { addListing, mockListings};