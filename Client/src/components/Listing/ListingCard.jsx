
export default function ListingCard({listing}){
    return(
        <div key={listing._id} className="border  w-full rounded-2xl ">
            <div className=" p- h-48 w-full  ">
                <img src={listing.image} className="h-full w-full rounded-t-2xl object-cover" alt="Home"/>
            </div>
           <div className="p-2 flex  flex-col ">
            {/* <p>{listing._id}</p> */}
            <p>{listing.title}</p>
        
            <p>Price: Rs. {listing.price}/month</p>
            </div>
        </div>
    )
}