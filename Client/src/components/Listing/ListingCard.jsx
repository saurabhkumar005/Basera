import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Heart } from "lucide-react"
import chatOnWhatsapp from "../../utils/ChatOnWhatsapp.js"

export default function ListingCard({ listing, userFavourites = [], onToggleFavourite }) {
    const isFav = userFavourites.includes(listing._id?.toString());
    const hasMultiplePhotos = listing?.listingPhotos?.length > 1;

    const [currentImgIdx, setCurrentImgIdx] = useState(0);
    const intervalRef = useRef(null);

    const startSlideshow = () => {
        if (!hasMultiplePhotos) return;
        intervalRef.current = setInterval(() => {
            setCurrentImgIdx(prev => (prev + 1) % listing.listingPhotos.length);
        }, 1500);
    };

    const stopSlideshow = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCurrentImgIdx(0);
    };

    useEffect(() => {
        return () => stopSlideshow();
    }, []);

    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggleFavourite) onToggleFavourite(listing._id);
    };

    const handleWhatsApp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const msg = `Hi, I am interested in your property: ${listing.title}, located at ${listing.address}. Is it still available?`;
        chatOnWhatsapp(listing.contactNumber, msg);
    };

    return (
        <Link
            to={`/listing/${listing._id}`}
            state={listing}
            className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Image Area */}
            <div
                className="relative w-full aspect-video overflow-hidden bg-slate-100"
                onMouseEnter={startSlideshow}
                onMouseLeave={stopSlideshow}
            >
                {listing?.listingPhotos?.length > 0 ? (
                    <img
                        src={listing.listingPhotos[currentImgIdx]}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No Image</div>
                )}

                {/* Listing Type Badge */}
                {listing?.listingType && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        {listing.listingType}
                    </span>
                )}

                {/* Slideshow Dots */}
                {hasMultiplePhotos && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {listing.listingPhotos.map((_, i) => (
                            <span
                                key={i}
                                className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImgIdx ? 'bg-white w-3' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Heart Icon */}
                <button
                    onClick={handleHeartClick}
                    aria-label="Toggle Favourite"
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow hover:scale-110 transition-transform duration-200"
                >
                    <Heart
                        size={16}
                        className={isFav ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-none'}
                    />
                </button>
            </div>

            {/* Card Body */}
            <div className="p-3 flex flex-col gap-1">
                <h3 className="text-gray-900 font-semibold text-sm leading-tight line-clamp-1">{listing.title}</h3>
                <p className="text-orange-500 font-bold text-base">
                    ₹{listing.price?.toLocaleString('en-IN')}
                    <span className="text-xs text-gray-400 font-normal">/mo</span>
                </p>
                <p className="text-xs text-gray-400 line-clamp-1">📍 {listing.address}, {listing.city}</p>

                {/* WhatsApp Button */}
                <button
                    onClick={handleWhatsApp}
                    className="mt-2 w-full py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 text-xs font-semibold border border-green-200 transition-colors"
                >
                    💬 Chat on WhatsApp
                </button>
            </div>
        </Link>
    );
}
