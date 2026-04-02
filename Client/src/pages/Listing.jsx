import ListingCard from "../components/Listing/ListingCard"
import SearchBar from "../components/Layout/SearchBar.jsx"
import getListing from '../api/ListingData.js';
import { useState, useEffect } from "react";
import ListingCardSkeleton from "../components/UI/ListingCardSkeleton.jsx";

export default function Listing() {
    const [loading, setLoading] = useState(true);
    const [listingData, setListingData] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const data = await getListing();
                setListingData(data.reverse());
            } catch (err) {
                console.error("Failed to fetch listings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-white border-b border-slate-100 shadow-sm w-full py-5 flex justify-center px-4">
                <SearchBar />
            </div>

            {/* Listings */}
            <div className="max-w-screen-xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <ListingCardSkeleton key={i} />
                        ))}
                    </div>
                ) : listingData.length === 0 ? (
                    <div className="h-80 flex flex-col items-center justify-center text-gray-400 gap-3">
                        <span className="text-5xl">🏠</span>
                        <p className="text-lg font-medium">No listings found</p>
                        <p className="text-sm">Be the first to add a listing!</p>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-400 mb-5">{listingData.length} properties found</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {listingData.map((item) => (
                                <ListingCard listing={item} key={item._id || Math.random()} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}