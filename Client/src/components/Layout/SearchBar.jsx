import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { searchListings } from '../../api/ListingData.js'

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const debounceRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!val.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchListings(val);
                setResults(data);
                setShowDropdown(true);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleResultClick = (listing) => {
        setQuery('');
        setResults([]);
        setShowDropdown(false);
        navigate(`/listing/${listing._id}`, { state: listing });
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div ref={containerRef} className='relative h-12 w-[350px] md:w-[400px]'>
            {/* Input Bar */}
            <div className='h-full w-full border border-orange-400 rounded-full flex items-center bg-white shadow-sm'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    className='w-full h-full outline-none px-5 bg-transparent text-gray-800 text-sm rounded-l-full'
                    placeholder='Search PG, Rooms, Hostels...'
                    autoComplete='off'
                />
                <button
                    className='p-3 rounded-r-full bg-orange-400 hover:bg-orange-500 transition-colors'
                    aria-label='search'
                >
                    <Search size={18} className="text-white" />
                </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div className='absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden'>
                    {loading ? (
                        <div className='px-4 py-3 text-sm text-gray-400 text-center'>Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((listing) => (
                            <button
                                key={listing._id}
                                onMouseDown={() => handleResultClick(listing)}
                                className='w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors border-b border-slate-100 last:border-0'
                            >
                                {listing.listingPhotos?.[0] && (
                                    <img
                                        src={listing.listingPhotos[0]}
                                        alt={listing.title}
                                        className='w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100'
                                    />
                                )}
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-semibold text-gray-800 truncate'>{listing.title}</p>
                                    <p className='text-xs text-gray-400 truncate'>📍 {listing.city} · ₹{listing.price?.toLocaleString('en-IN')}/mo</p>
                                </div>
                                {listing.listingType && (
                                    <span className='text-[10px] font-semibold bg-orange-100 text-orange-600 rounded-full px-2 py-0.5 flex-shrink-0'>
                                        {listing.listingType}
                                    </span>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className='px-4 py-3 text-sm text-gray-400 text-center'>No results found for "{query}"</div>
                    )}
                </div>
            )}
        </div>
    );
}