import api from "./axiosInstance";

export const getUser = async () => {
    const res = await api.get('/user/profile/');
    return res.data;
}

export const getFavourites = async () => {
    try {
        const res = await api.get('/user/favourites/');
        return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
        console.error("Error fetching favourites:", err);
        return [];
    }
}

export const addFavourite = async (listingId) => {
    const res = await api.post(`/user/favourites/${listingId}`);
    return res.data;
}

export const removeFavourite = async (listingId) => {
    const res = await api.delete(`/user/favourites/${listingId}`);
    return res.data;
}