import ListingCard from "../Listing/ListingCard"
import getListings, { mockListings, mockImages } from "../../api/ListingData.js"
import { useState, useEffect } from 'react'
export default function FeaturedListings() {
    //TODO: apply useContext for better state management and avoid slowness due to repetitive same api call
    const [listings, setListing] = useState(mockListings);
    useEffect(() => {
       
            const getListingFromDB = async () => {
                const data = await getListings();
                const res = data.map((item)=>({...item, image: item.image || mockImages[Math.floor(Math.random()*mockImages.length)]}));
                setListing([...res,...listings]);
            }
       
        getListingFromDB();
    }, []);
    

    return (
        <div className="my-5 mx-2">
            <h1 className="text-3xl font-bold  text-orange-400">
                Featured Near You
            </h1>
            <div className="mx-2 my-2 flex gap-4  overflow-x-auto pb-4">
                {listings.slice(0,10).map((listing, idx) => (
                    <div key={listing._id} className="min-w-[250px] ">
                        <ListingCard key={listing._id} listing={listing} />
                    </div>
                ))}
            </div>

        </div>
    )
}