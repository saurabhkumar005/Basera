import ListingCard from "../Listing/ListingCard"
import {mockListings as listings} from "../../api/ListingData.jsx"
export default function FeaturedListings(){

    return(
        <div className="my-5 mx-2">
            <h1 className="text-3xl font-bold  text-orange-400">
                Featured Near You
            </h1>
            <div className="mx-2 my-2 flex gap-4  overflow-x-auto pb-4"> 
           {listings.slice(0,10).map((listing,idx)=>(
            <div key={listing._id} className="min-w-[250px] ">
            <ListingCard key={listing._id} listing={listing}/>
            </div>
           ))}
           </div>
           
        </div>
    )
}