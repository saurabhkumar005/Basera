import ListingCard from "../components/Listing/ListingCard"
import SearchBar from "../components/Layout/SearchBar.jsx"
import getListing from '../api/ListingData.js';
import { useState, useEffect } from "react";

export default function Listing(){
    const [loading, setLoading] = useState(false);
    const [listingData, setListingData]= useState([]);
    useEffect(()=>{
        const fetchListings = async()=>{
            setLoading(true);
            try{
            const data = await getListing();
            const modifiedData = data.reverse();
            setListingData([ ...modifiedData, ...listingData]);
            } catch(err){
                console.error("Failed to fetch listing data from server: "+err);
            }finally{setLoading(false);}
        }
        fetchListings();
    },[]);

    if(loading)return <div className="h-180 w-full flex justify-center items-center text-orange-400 text-2xl ">Fetching Listings in less than a minutes...</div>
      if(listingData.length==0)return <div className="h-180 w-full flex justify-center items-center text-orange-400 text-2xl ">No Listing added yet!</div>
    return (
       <div>
        <div className="bg-orange-100 w-[100vw] h-28 flex justify-center items-center">
        <SearchBar/>
        </div>
        <div className=" w-full h-full  gap-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listingData.map((item)=>{
            return <ListingCard listing={item} key={item._id? item._id : Math.random()*1000}/>
        })}
        </div>
        {loading && <div className="align-center text-gray-600"> Loading...</div>}
       </div>
    )
}