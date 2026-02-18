import ListingCard from "../Listing/ListingCard"
import getListings from "../../api/ListingData.js"
import { useState, useEffect } from 'react'
export default function FeaturedListings() {
    //TODO: apply useContext for better state management and avoid slowness due to repetitive same api call
    const [listings, setListing] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       
            const getListingFromDB = async () => {
                setLoading(true);
                const data = await getListings();
                const res = data.reverse().slice(0,data.length<10? data.length : 10);
                setListing([...res,...listings]);
                setLoading(false);
            }
       
        getListingFromDB();
    }, []);

    if(loading)return <h1 className="text-xl text-orange-600 flex items-center justify-center w-full h-30 ">Loading Featured Near You...</h1>
  
    return (
        <div className="my-5 mx-2">
            <h1 className="text-3xl font-bold  text-orange-400">
                Featured Listings
            </h1>
            {listings.length===0 ?  <div className="h-40 w-full flex justify-center items-center text-orange-400 text-2xl ">No Listing added yet!</div>
            :
            <div className="mx-2 my-2 flex gap-4  overflow-x-auto pb-4">
                {listings.slice(0,10).map((listing, idx) => (
                    <div key={listing._id} className="min-w-[250px] ">
                        <ListingCard key={listing._id} listing={listing} />
                    </div>
                ))}
            </div>
            }

        </div>
    )
}