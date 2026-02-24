import { useContext, createContext, useEffect, useState, useCallback } from 'react'
import { getJWTToken } from '../utils/Auth';
import { getUser } from '../api/UserData';
import { addFavourite, removeFavourite } from '../api/UserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserDetails = async () => {
        const token = getJWTToken();
        try {
            if (token) {
                const data = await getUser();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const favouriteIds = new Set(
        (user?.favourites || []).map(id => id?.toString())
    );

    const toggleFavourite = useCallback(async (listingId) => {
        if (!user) return;
        const isFav = favouriteIds.has(listingId.toString());
        setUser(prev => ({
            ...prev,
            favourites: isFav
                ? prev.favourites.filter(id => id?.toString() !== listingId.toString())
                : [...(prev.favourites || []), listingId]
        }));
        try {
            if (isFav) {
                await removeFavourite(listingId);
            } else {
                await addFavourite(listingId);
            }
        } catch (err) {
            setUser(prev => ({
                ...prev,
                favourites: isFav
                    ? [...(prev.favourites || []), listingId]
                    : prev.favourites.filter(id => id?.toString() !== listingId.toString())
            }));
            console.error('Favourite toggle failed:', err);
        }
    }, [user, favouriteIds]);

    const value = {
        user, loading, setUser, isAuthenticated: !!user,
        getUserDetails, favouriteIds, toggleFavourite
    };

    return (
        <AuthContext.Provider value={value}>
            {loading
                ? <div className='w-screen h-screen flex flex-col justify-center items-center gap-3 bg-white'>
                    <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-orange-400 font-semibold tracking-wide">Getting Your Basera...</p>
                </div>
                : children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}