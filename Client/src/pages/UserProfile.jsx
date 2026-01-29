
import { useAuthContext } from "../context/AuthContext";
import { countMyListing } from "../api/ListingData";
import profileBG from "../assets/images/profileBG.png"
import dp1 from "../assets/images/anime.jpg"
import { useState, useEffect } from "react";
export default function UserProfile() {
    const { user, isAuthenticated } = useAuthContext();
    const [listingCount, setListingCount] = useState(0);
    
    useEffect(()=>{
        const getCountOfListing = async()=>{
            if(user){
            try{
            const count = await countMyListing();
            setListingCount(count);
            }catch(err){
                console.log("error in fetching listing count", err);
                setListingCount(0);
            }
        }
        }
        getCountOfListing();
    },[user])

    const formatDate = (dateString)=>{
        if(!dateString)return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US',{
            year: "numeric", month:'long'
        });
    };

    return (
        <>
            {/* HEro part for profile page(upper part) */}
            <div style={{ backgroundImage: `url(${profileBG})` }}
                className="w-full px-4 py-8  bg-cover relative bg-center bg-no-repeat flex justify-center items-center ">
                <div className=" sm:p-5  flex  justify-evenly gap-4 sm:gap-10" >
                    {/* Profile image and name section */}
                    <img className="p-[0.2em] mt-3 bg-white w-44 h-44 lg:w-52 lg:h-52  rounded-full object-cover object-center"
                        src={user.avatarUrl ? user.avatarUrl : dp1} />
                    <div className="   flex flex-col  gap-5 w-[60%] md:w-[60vw] ">
                        <div className=" text-white font-bold flex flex-col gap-1">
                            <h2 className="text-4xl font-bold ">{user.name}</h2>
                            <h3 className="">{user.email}</h3>
                            <h3 >{user.phone}</h3>
                            <div className="">Member Since {formatDate(user.createdAt)}</div>
                        </div>
                        
                        <div className=" flex gap-4  items-center flex-wrap">
                            <button className="bg-white p-4 rounded-3xl">❤️{user.favourites.length} Favorites</button>
                            <button className="bg-white p-4 rounded-3xl">🏠{listingCount} Listings </button>
                            <button className="bg-white p-4 rounded-3xl">💬 Messages</button>
                        </div>
                        <div className="flex gap-5 p-1 ">
                            <button className="bg-orange-600 px-4 py-2  text-white  rounded-md">Edit Profile</button>
                            <button className="bg-orange-600 px-3 py-2 text-white   rounded-md">Change Password</button>
                          
                        </div>
                          
                    </div>
                </div>
            </div>
        </>
    )
}