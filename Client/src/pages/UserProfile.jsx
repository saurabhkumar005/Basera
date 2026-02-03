
import { useAuthContext } from "../context/AuthContext";
import { getMyListings } from "../api/ListingData";
import profileBG from "../assets/images/profileBG.png"
import dp1 from "../assets/images/anime.jpg"
import { useState, useEffect } from "react";
import ListingCard from "../components/Listing/ListingCard";
export default function UserProfile() {
    const { user, isAuthenticated } = useAuthContext();
    const [myListings, setMyListings] = useState([]);
    
    useEffect(()=>{
        const fetchMyListings = async()=>{
            if(user){
            try{
            const listings = await getMyListings();
            setMyListings(listings);
            }catch(err){
                console.log("error in fetching my Listings", err);
                
            }
        }
        }
        fetchMyListings();
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
                className="w-full px-4 py-10  bg-cover relative bg-center bg-no-repeat flex justify-center items-center ">
                <div className=" sm:p-5  flex  justify-evenly gap-4 sm:gap-10" >
                    {/* Profile image and name section */}
                    <img className="p-[0.2em] mt-3 bg-white w-44 h-44 lg:w-52 lg:h-52  rounded-full object-cover object-center"
                        src={user.avatarUrl ? user.avatarUrl : dp1} />
                    <div className="   flex flex-col  gap-5 w-[60%] md:w-[60vw] ">
                        <div className=" text-white font-bold flex flex-col gap-1">
                            <h2 className="text-4xl font-bold ">{user.name}</h2>
                            <h3 className="">{user.email}</h3>
                            <h3 >{user.phone}</h3>
                            <div className="">Member Since {formatDate(user?.createdAt)}</div>
                        </div>
                        
                        <div className=" flex gap-4  items-center flex-wrap">
                            <button className="bg-white p-4 rounded-3xl">❤️{user?.favourites?.length || 0} Favorites</button>
                            <button className="bg-white p-4 rounded-3xl">🏠{myListings.length} Listings </button>
                            <button className="bg-white p-4 rounded-3xl">💬 Messages</button>
                        </div>
                        <div className="flex gap-5 p-1 ">
                            <button className="bg-orange-600 px-4 py-2  text-white  rounded-md">Edit Profile</button>
                            <button className="bg-orange-600 px-3 py-2 text-white   rounded-md">Change Password</button>
                          
                        </div>
                          
                    </div>
                </div>
            </div>

            {/* Mylisting page */}
            <div className="p-5">
                <h1 className="text-2xl font-bold text-orange-600 underline">My Listings</h1>
                <div className="flex overflow-x-auto gap-5 p-3">
                    {myListings.length>0 ? myListings.map((listing)=>(
                        <div key={listing._id} className="w-[270px] flex-shrink-0 "> 
                        <ListingCard  listing={listing}></ListingCard>
                        </div>
                    ))
                : <div className="w-[100vw] text-center p-6"> No Listing yet!</div>
                }
                </div>
            </div>

            {/* My Favourites page */}
            <div className="p-5">
                <h1 className="text-2xl font-bold text-orange-600 underline">My Favourites </h1>
                <div className="flex overflow-x-auto  gap-5 p-3">
                    {user?.favourites?.length>0 ? user.favourites.map((listing)=>(
                        <div className="w-[300px] "  key={listing._id}> 
                        <ListingCard listing={listing}></ListingCard>
                        </div>
                    ))
                : <div className="w-[100vw] text-center p-6"> No Favorites Listing yet!</div>
                }
                </div>
            </div>
        </>
    )
}