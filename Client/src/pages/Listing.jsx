import ListingCard from "../components/Listing/ListingCard"
import SearchBar from "../components/SearchBar"
import listings from "../api/ListingData.jsx"
export default function Listing(){
    return (
       <div>
        <div className="bg-orange-100 w-[100vw] h-28 flex justify-center items-center">
        <SearchBar/>
        </div>
        <div className="w-[100vw] h-full  gap-5 p-5 flex justify-around flex-wrap">
        {listings.map((item)=>{
            return <ListingCard listing={item} key={item._id}/>
        })}
        </div>
       </div>
    )
}