import { useLocation, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getListingById } from "../api/ListingData.js"
import chatOnWhatsapp from '../utils/ChatOnWhatsapp.js'
import { useAuthContext } from "../context/AuthContext"
import { getFavourites, addFavourite, removeFavourite } from "../api/UserData"
import { Heart } from "lucide-react"

export default function ListingDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuthContext();

    const [listing, setListing] = useState(location.state || null);
    const [mainImage, setMainImage] = useState(listing?.listingPhotos?.[0] || null);
    const [isFav, setIsFav] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    useEffect(() => {
        if (!listing) {
            const getDetails = async () => {
                const res = await getListingById(id);
                setListing(res);
                if (res?.listingPhotos) setMainImage(res.listingPhotos[0]);
            }
            getDetails();
        }
    }, [id]);

    useEffect(() => {
        if (!isAuthenticated || !id) return;
        const checkFav = async () => {
            const favs = await getFavourites();
            const ids = favs.map(f => f._id?.toString() || f.toString());
            setIsFav(ids.includes(id));
        };
        checkFav();
    }, [isAuthenticated, id]);

    const handleToggleFavourite = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setFavLoading(true);
        try {
            if (isFav) {
                await removeFavourite(id);
                setIsFav(false);
            } else {
                await addFavourite(id);
                setIsFav(true);
            }
        } catch (err) {
            console.error("Favorite toggle error:", err);
        } finally {
            setFavLoading(false);
        }
    };

    if (!listing) return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-200">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-500 text-lg">Loading property...</p>
            </div>
        </div>
    );

    const whatsappMessage = `Hi, ${listing?.owner?.name || "owner"} I am interested in your property: ${listing.title}, located at ${listing.address}. Is it still available?`;

    return (
        <div className="w-full p-4 md:p-8 bg-slate-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-0">
                    <div className="flex flex-col gap-2 lg:w-[58%] p-4">
                        {mainImage
                            ? <img className="w-full h-80 md:h-96 object-cover rounded-xl border border-slate-200"
                                src={mainImage} alt="main listing" />
                            : <div className="w-full h-80 rounded-xl bg-slate-100 flex items-center justify-center text-gray-400">No Image Available</div>
                        }
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {listing?.listingPhotos?.map((ele, idx) => (
                                <img
                                    className={`w-20 h-16 md:w-24 md:h-20 flex-shrink-0 object-cover cursor-pointer rounded-lg border-2 transition-all ${mainImage === ele ? 'border-orange-400 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    key={idx} src={ele} alt={`Photo ${idx + 1}`}
                                    onClick={() => setMainImage(ele)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:w-[42%] p-5 lg:border-l border-slate-100">
                        <div>
                            <span className="text-xs font-semibold text-white bg-orange-500 rounded-full px-3 py-1">{listing?.listingType}</span>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{listing?.title}</h1>
                            <p className="text-2xl font-semibold text-orange-500 mt-1">₹{listing?.price?.toLocaleString('en-IN')}<span className="text-base font-normal text-gray-400">/month</span></p>
                            <p className="text-gray-500 text-sm mt-1">📍 {listing?.address}, {listing?.city}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => chatOnWhatsapp(listing.contactNumber, whatsappMessage)}
                                className="flex-1 min-w-[140px] py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-base transition-colors"
                            >
                                💬 Chat on WhatsApp
                            </button>
                            <button
                                onClick={handleToggleFavourite}
                                disabled={favLoading}
                                className={`flex-1 min-w-[140px] py-3 rounded-2xl font-semibold text-base border-2 transition-all flex items-center justify-center gap-2 ${isFav
                                        ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
                                        : 'bg-white border-orange-400 text-orange-500 hover:bg-orange-50'
                                    } ${favLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                <Heart size={18} className={isFav ? 'fill-white text-white' : 'fill-none text-orange-500'} />
                                {favLoading ? 'Saving...' : isFav ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {`Welcome to your new home! This spacious ${listing?.listingType} located in the heart of ${listing?.city} offers a perfect blend of comfort and convenience. Available for just ₹${listing?.price?.toLocaleString('en-IN')} per month, it comes equipped with ${listing?.amenities?.join(", ")} to ensure a hassle-free living experience. Ideal for students and professionals looking for a safe and friendly neighborhood near local markets and transport. Contact owner now!`}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-2 gap-3 text-sm text-gray-700">
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Type</span>{listing?.listingType}</div>
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">City</span>{listing?.city}</div>
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Sharing</span>{listing?.sharingType}</div>
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Posted</span>{new Date(listing?.createdAt || listing?.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">Contact</span>{listing?.contactNumber}</div>
                            <div><span className="text-gray-400 block text-xs uppercase tracking-wide">WhatsApp</span>{listing?.contactNumber}</div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex-1 bg-slate-50 rounded-2xl p-4 text-sm text-gray-700">
                                <h2 className="text-base font-semibold text-gray-800 mb-2">Amenities</h2>
                                {listing?.amenities?.map((ele, idx) => (
                                    <p key={idx} className="py-0.5">✓ {ele}</p>
                                ))}
                            </div>
                            <div className="flex-1 bg-slate-50 rounded-2xl p-4 text-sm text-gray-700">
                                <h2 className="text-base font-semibold text-gray-800 mb-2">Rules</h2>
                                {listing?.rules?.map((ele, idx) => (
                                    <p key={idx} className="py-0.5">• {ele}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}