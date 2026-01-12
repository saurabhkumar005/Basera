import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getListingById } from "../api/ListingData.js";
import { mockImages } from "../api/ListingData.js";
export default function ListingDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [listing, setListing] = useState(location.state || null);
    const [mainImage, setMainImage] = useState(listing?.image || null);
    const handleImageChange = (imgUrl) => {
        setMainImage(imgUrl);
    }
    useEffect(() => {
        if (!listing) {
            const getDetails = async () => {
                console.log("Fetching listing for listing details page");
                const res = await getListingById(id);
                setListing(res);
                if (res && res.image) {
                    setMainImage(listing.image);
                }
            }
            getDetails();
        }
    }, [listing, id]);

    if (!listing) return <h1>Loading....</h1>;
    return (
        <div className="w-full   p-6 md:p-8 bg-slate-200">
            {/* image section div 1 */}
            <div className=" p-3 h-full  flex flex-col lg:flex-row gap-1 lg:gap-10  bg-white rounded-2xl " >
                <div className="flex flex-col gap-2 lg:w-[58%]  ">
                    <img className=" border border-slate-300 w-full h-96 object-cover rounded-xl h-[65%] lg:h-[80%]"
                        src={mainImage} alt="main listing" />
                    <div className="p-1 flex flex- gap-2 overflow-x-auto">
                        {mockImages.slice(0, 5).map((ele, idx) => (
                            <img className="w-32 sm:w-36 md:w-40   object-cover cursor-pointer rounded-md hover:opacity-80 border "
                                key={idx+1} src={ele} alt={`Listing Image ${idx + 1}`} onClick={() => handleImageChange(ele)} />
                        ))}
                    </div>
                    
                </div>
                <div className=" p-2 flex flex-col gap-4 lg:max-w-[40%]">
                    <div className="">
                        <h1 className="text-3xl ">{listing.title}</h1>
                        <p className="text-2xl ">Rs. {listing.price}</p>
                        {/* add listing.state here */}
                        <p className="text-lg">{listing.address}, {listing.city}</p>
                    </div>


{/* complete this chat on whatsapp and add to Liked collections */}
<div className="px-1 flex flex-wrap gap-3 justify-between">
    <button className="p-3 w-[47%] rounded-3xl bg-green-500  hover:bg-green-400 hover:border hover:border-green-500 hover:border-3 text-center text-xl text-gray-800">Call on Whatsapp</button>
    <button className="p-3 w-[47%] rounded-3xl border border-orange-500 border-2 hover: hover:bg-orange-400 text-center text-xl text-gray-800">Add to WishList</button>

</div>

                    {/* add desription from listing model here */}
                    <div className="min-h-20 bg-slate-200 rounded-2xl text-md text-gray-800 p-4">
                        <h1 className="text-xl text-black mb-2">Description</h1>
                        <p>{`Welcome to your new home! This spacious ${listing.type} located in the heart of ${listing.city} offers a perfect blend of comfort and convenience. 
                                Available for just Rs. ${listing.price} per month, it comes equipped with ${listing.amenities?.join(", ")} to ensure a hassle-free living experience. Ideal for students and professionals looking for a safe and friendly neighborhood near local markets and transport. Book a visit today!`}</p>
                    </div>



                    <div className=" rounded-2xl bg-slate-200 text-md  text-gray-800  justify-evenly p-4 grid grid-cols-2">
                        <p>Type: {listing.listingType}</p>
                        <p>City: {listing.city}</p>
                        <p>Sharing Type: {listing.sharingType}</p>
                        <p className="">
                            Posted on: {new Date(listing.createdAt || listing.updatedAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p>Phone Number: {listing.contactNumber}</p>
                        <p>Whatsapp Number: {listing.contactNumber}</p>

                    </div>


                    {/* Amemnities and Rules */}
                    <div className="flex justify-between">
                        <div className="w-[47%] bg-slate-200 rounded-2xl text-md text-gray-800 p-4">
                            <h1 className="text-xl text-black mb-2">Amenities</h1>
                            {listing.amenities.map((ele, idx) => (
                                <p key={idx}>{idx + 1}. {ele}</p>
                            ))}
                        </div>
                        <div className="w-[47%] bg-slate-200 rounded-2xl text-md text-gray-800 p-4">
                            <h1 className="text-xl text-black mb-2">Rules</h1>
                            {listing.rules.map((ele, idx) => (
                                <p key={idx}>{idx + 1}. {ele}</p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}