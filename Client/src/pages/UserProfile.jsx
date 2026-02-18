
import { useAuthContext } from "../context/AuthContext";
import { getMyListings } from "../api/ListingData";
import profileBG from "../assets/images/profileBG.png"
import dp1 from "../assets/images/anime.jpg"
import { useState, useEffect } from "react";
import ListingCard from "../components/Listing/ListingCard";
import { UserRound, UserRoundPen, UserRoundPlus } from 'lucide-react';
import EditProfile from "../modals/EditProfile";
import ChatOnWhatsapp from "../utils/ChatOnWhatsapp";
import {MessageCircleMore} from "lucide-react"
import { useParams } from "react-router-dom";

export default function UserProfile() {
    const { user, isAuthenticated, setUser } = useAuthContext();
    const {id} = useParams();
    const [myListings, setMyListings] = useState([]);
    const [isEditModalOpen, setEditModal] = useState(false);
    useEffect(()=>{
        const fetchMyListings = async()=>{
            if(user){
            try{
            const listings = await getMyListings();
            setMyListings(listings || []);
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
                className=" w-full px-4 py-10  bg-cover relative bg-center bg-no-repeat flex justify-center items-center ">
                <div className=" sm:p-5  flex  justify-evenly gap-4 sm:gap-10" >
                    {/* Profile image and name section */}
                    <div className="border-orange-400 border-2 bg-gray-700 flex justify-center items-center relative  mt-3  w-44 h-44 lg:w-52 lg:h-52  rounded-full ">
                    {user?.avatarUrl ? <img className="  w-44 h-44 lg:w-52 lg:h-52  rounded-full  object-cover object-top"
                        src={user.avatarUrl} /> :
                      <UserRoundPlus onClick={()=>setEditModal(true)} className="  hover:scale-104 pl-4 flex text-white   w-3/6 h-3/6" />
                    }
                    </div>
                    <div className="   flex flex-col  gap-5 w-[60%] md:w-[60vw] ">
                        <div className=" text-white font-bold flex flex-col gap-1">
                            <h2 className="text-4xl font-bold ">{user?.name}</h2>
                            <h3 className="">{user?.email}</h3>
                            <h3 >{user?.phone}</h3>
                            <div className="">Member Since {formatDate(user?.createdAt)}</div>
                        </div>
                        
                        <div className=" flex gap-4  items-center flex-wrap">
                            <button className="bg-white p-4 rounded-3xl">❤️{user?.favourites?.length || 0} Favorites</button>
                            <button className="bg-white p-4 rounded-3xl">🏠{myListings?.length || 0} Listings </button>
                            <button onClick={()=>(ChatOnWhatsapp(user?.phone))} className=" flex gap-3 bg-white py-4 px-2   rounded-3xl hover:border hover:border-green-400 hover:border-2 text-green-500 hover:bg-green-400 hover:text-white"><MessageCircleMore/>Whatsapp</button>
                        </div>
                        <div className="flex gap-5 p-1 ">
                            <button onClick={()=>{setEditModal(true)}} className="bg-orange-600 hover:bg-orange-500 px-4 py-2  text-white  rounded-md hover:-translate-y-[0.1rem]">Edit Profile</button>
                            <button className=" bg-gray-400 px-3 py-2 text-white   rounded-md " 
                            title="Coming Soon">Change Password</button>
                          
                        </div>
                          
                    </div>
                </div>
            </div>

            {/* Mylisting page */}
            <div className="p-5">
                <h1 className="text-2xl font-bold text-orange-600 underline">My Listings</h1>
                <div className="flex overflow-x-auto gap-5 p-3">
                    {myListings?.length>0 ? myListings.map((listing)=>(
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
                
               {isEditModalOpen && <EditProfile user={user} onClose={()=>setEditModal(false)} onUpdate={setUser}/>}
          
            
        </>
    )
}