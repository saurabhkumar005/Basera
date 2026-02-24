
import { useAuthContext } from "../context/AuthContext";
import { getMyListings } from "../api/ListingData";
import { getFavourites } from "../api/UserData";
import profileBG from "../assets/images/profileBG.png"
import { useState, useEffect } from "react";
import ListingCard from "../components/Listing/ListingCard";
import ListingCardSkeleton from "../components/UI/ListingCardSkeleton";
import { UserRoundPlus } from 'lucide-react';
import EditProfile from "../modals/EditProfile";
import ChatOnWhatsapp from "../utils/ChatOnWhatsapp";
import { MessageCircleMore } from "lucide-react"

export default function UserProfile() {
    const { user, isAuthenticated, setUser } = useAuthContext();
    const [myListings, setMyListings] = useState([]);
    const [myFavourites, setMyFavourites] = useState([]);
    const [listingsLoading, setListingsLoading] = useState(true);
    const [favsLoading, setFavsLoading] = useState(true);
    const [isEditModalOpen, setEditModal] = useState(false);

    useEffect(() => {
        const fetchMyListings = async () => {
            if (!user) return;
            setListingsLoading(true);
            try {
                const listings = await getMyListings();
                setMyListings(listings || []);
            } catch (err) {
                console.log("Error fetching my listings:", err);
            } finally {
                setListingsLoading(false);
            }
        }
        fetchMyListings();
    }, [user]);

    useEffect(() => {
        const fetchFavourites = async () => {
            if (!user) return;
            setFavsLoading(true);
            try {
                const favs = await getFavourites();
                setMyFavourites(favs);
            } catch (err) {
                console.log("Error fetching favourites:", err);
            } finally {
                setFavsLoading(false);
            }
        };
        fetchFavourites();
    }, [user]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { year: "numeric", month: 'long' });
    };

    const SkeletonRow = () => (
        <div className="flex gap-5 p-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-[270px] flex-shrink-0"><ListingCardSkeleton /></div>
            ))}
        </div>
    );

    return (
        <>
            {/* Hero Section */}
            <div style={{ backgroundImage: `url(${profileBG})` }}
                className="w-full px-4 py-10 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="sm:p-5 flex justify-evenly gap-4 sm:gap-10">
                    {/* Avatar */}
                    <div className="border-orange-400 border-2 bg-gray-700 flex justify-center items-center relative mt-3 w-44 h-44 lg:w-52 lg:h-52 rounded-full">
                        {user?.avatarUrl
                            ? <img className="w-44 h-44 lg:w-52 lg:h-52 rounded-full object-cover object-top" src={user.avatarUrl} alt="Avatar" />
                            : <UserRoundPlus onClick={() => setEditModal(true)} className="hover:scale-104 pl-4 flex text-white w-3/6 h-3/6 cursor-pointer" />
                        }
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-5 w-[60%] md:w-[60vw]">
                        <div className="text-white font-bold flex flex-col gap-1">
                            <h2 className="text-4xl font-bold">{user?.name}</h2>
                            <h3>{user?.email}</h3>
                            <h3>{user?.phone}</h3>
                            <div className="text-sm text-orange-200">Member Since {formatDate(user?.createdAt)}</div>
                        </div>
                        <div className="flex gap-4 items-center flex-wrap">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-semibold text-gray-800 shadow">
                                ❤️ {myFavourites.length} Favorites
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl text-sm font-semibold text-gray-800 shadow">
                                🏠 {myListings.length} Listings
                            </div>
                            <button onClick={() => ChatOnWhatsapp(user?.phone)} className="flex gap-2 items-center bg-white/90 backdrop-blur-sm py-2 px-4 rounded-2xl text-sm font-semibold text-green-600 hover:bg-green-500 hover:text-white transition-colors shadow">
                                <MessageCircleMore size={16} />WhatsApp
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setEditModal(true)} className="bg-orange-500 hover:bg-orange-600 px-5 py-2 text-white rounded-xl font-semibold transition-colors shadow">
                                Edit Profile
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm px-5 py-2 text-white rounded-xl font-semibold" title="Coming Soon">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* My Listings */}
            <div className="p-5 max-w-screen-xl mx-auto">
                <h1 className="text-2xl font-bold text-orange-500 mb-4">My Listings</h1>
                {listingsLoading ? <SkeletonRow /> : myListings.length > 0 ? (
                    <div className="flex overflow-x-auto gap-5 pb-3">
                        {myListings.map((listing) => (
                            <div key={listing._id} className="w-[270px] flex-shrink-0">
                                <ListingCard listing={listing} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-12 text-gray-400">
                        <span className="text-4xl mb-2">📋</span>
                        <p>No listings yet!</p>
                    </div>
                )}
            </div>

            {/* My Favourites */}
            <div className="p-5 max-w-screen-xl mx-auto">
                <h1 className="text-2xl font-bold text-orange-500 mb-4">My Favourites</h1>
                {favsLoading ? <SkeletonRow /> : myFavourites.length > 0 ? (
                    <div className="flex overflow-x-auto gap-5 pb-3">
                        {myFavourites.map((listing) => (
                            <div key={listing._id} className="w-[270px] flex-shrink-0">
                                <ListingCard listing={listing} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-12 text-gray-400">
                        <span className="text-4xl mb-2">🏠</span>
                        <p className="text-lg">No Favourites yet!</p>
                        <p className="text-sm mt-1">Browse listings and hit the ❤️ to save them here.</p>
                    </div>
                )}
            </div>

            {isEditModalOpen && <EditProfile user={user} onClose={() => setEditModal(false)} onUpdate={setUser} />}
        </>
    )
}