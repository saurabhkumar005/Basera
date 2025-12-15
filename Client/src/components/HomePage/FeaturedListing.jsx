import ListingCard from "../Listing/ListingCard"
import home1 from "../../assets/images/home1.jpg"
import home2 from "../../assets/images/home2.jpg"
import home3 from "../../assets/images/home3.jpg"
import home4 from "../../assets/images/home4.jpg"
import home5 from "../../assets/images/home5.jpg"
export default function FeaturedListings(){
    const listings = [
        {_id:1,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home5},
        {_id:5,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home3},
        {_id:4,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home4},
        {_id:6,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home2},
        {_id:2,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home5},
        {_id:7,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home1},
        {_id:3,title:"RK complex", price: 15000, location: "Delhi", type: "PG", image: home5},
        ];

    return(
        <div className="my-5 mx-2">
            <h1 className="text-3xl font-bold  text-orange-400">
                Featured Near You
            </h1>
            <div className="mx-2 my-2 flex gap-4  overflow-x-auto "> 
           {listings.map((listing,idx)=>(
            <ListingCard key={listing._id} listing={listing}/>
           ))}
           </div>
           
        </div>
    )
}