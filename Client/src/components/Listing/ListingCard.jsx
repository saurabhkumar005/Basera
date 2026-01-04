import {Link} from "react-router-dom"

export default function ListingCard({listing}){

    return(
        <Link
        to={`/listing/${listing._id}`}
        state={listing}
          key={listing._id} className=" bg-orange-100 w-full rounded-2xl hover:opacity-80 hover:bg-orange-200 block h-full ">
            <div className=" p- h-48 w-full  ">
                <img src={listing.image} className="p-2 hover:p-1 h-full w-full rounded-2xl object-cover" alt="Home"/>
            </div>
           <div className="p-2 flex  flex-col ">
            <p>{listing.title}</p>
        
            <p>Rs. {listing.price}/month</p>
            <p>{listing.address}, {listing.city}</p>
            </div>
        </Link>
    )
}