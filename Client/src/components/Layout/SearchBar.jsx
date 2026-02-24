import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
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
        if (!val.trim()) { setResults([]); setShowDropdown(false); return; }
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

    const handleClear = () => { setQuery(''); setResults([]); setShowDropdown(false); };

    const handleResultClick = (listing) => {
        setQuery(''); setResults([]); setShowDropdown(false);
        navigate(`/listing/${listing._id}`, { state: listing });
    };

    useEffect(() => {
        const handleOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    return (
        <div ref={containerRef} className='relative w-full max-w-[480px]'>
            <div className='flex items-center h-12 w-full bg-white border-2 border-transparent rounded-full shadow-md focus-within:border-orange-400 focus-within:shadow-orange-100 focus-within:shadow-lg transition-all duration-200'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    className='flex-1 h-full outline-none pl-5 pr-2 bg-transparent text-gray-800 text-sm rounded-l-full placeholder:text-gray-400'
                    placeholder='Search PG, Rooms, Hostels...'
                    autoComplete='off'
                />
                {query && (
                    <button onClick={handleClear} className="p-1 mr-1 text-gray-300 hover:text-gray-500 transition-colors">
                        <X size={14} />
                    </button>
                )}
                <button
                    className='flex items-center justify-center h-full px-4 rounded-r-full bg-orange-500 hover:bg-orange-600 transition-colors'
                    aria-label='search'
                >
                    <Search size={18} className="text-white" />
                </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div className='absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden'>
                    {loading ? (
                        <div className='px-4 py-4 text-sm text-gray-400 text-center flex items-center justify-center gap-2'>
                            <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                            Searching...
                        </div>
                    ) : results.length > 0 ? (
                        results.map((listing) => (
                            <button
                                key={listing._id}
                                onMouseDown={() => handleResultClick(listing)}
                                className='w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors border-b border-slate-50 last:border-0'
                            >
                                {listing.listingPhotos?.[0] && (
                                    <img src={listing.listingPhotos[0]} alt={listing.title} className='w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100' />
                                )}
                                <div className='flex-1 min-w-0'>
                                    <p className='text-sm font-semibold text-gray-800 truncate'>{listing.title}</p>
                                    <p className='text-xs text-gray-400 truncate'>📍 {listing.city} · ₹{listing.price?.toLocaleString('en-IN')}/mo</p>
                                </div>
                                {listing.listingType && (
                                    <span className='text-[10px] font-semibold bg-orange-100 text-orange-600 rounded-full px-2 py-0.5 flex-shrink-0'>{listing.listingType}</span>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className='px-4 py-4 text-sm text-gray-400 text-center'>No results found for "{query}"</div>
                    )}
                </div>
            )}
        </div>
    );
}