
export default function ListingCard({ listing}){
    return(
        <div key={listing._id} className="border h-60 w-50 flex-shrink-0">
            <div className="border h-33  bg-gradient-to-r from-orange-400 to-yellow-900">
                <img src={listing.image} className="h-full w-full object-cover" alt="Home"/>
            </div>
           <div className="p-2 flex  flex-col ">
            {/* <p>{listing._id}</p> */}
            <p>{listing.title}</p>
        
            <p>Price: Rs. {listing.price}/month</p>
            </div>
        </div>
    )
}