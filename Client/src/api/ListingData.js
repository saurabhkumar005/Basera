import api from "./axiosInstance.js"

const  getListings = async()=>{
  try{
    const res =  await api.get('/listing/');
    return res.data;
  }catch(error){
    console.error("API Error in getting all listings:", error);
    return [];
  }
};
export const getListingById = async(id)=>{
  try{
    const res = await api.get(`/listing/${id}`);
    return res.data;
  }catch(err){
    console.log("Axios: Error fetching listing by id from server!");
    return null;
  }
};

const addListing = async(listing)=>{
    try{
      const res = await api.post('/listing/',listing);
      return res;
    }catch(err){
      console.log("Listing add failed: "+err);
      throw err;
    }
}
export const countMyListing = async()=>{
  const res = await api.get('/listing/countMyListing');
  console.log("listing count fetched from server ", res.data.count);
  return res.data.count;
}
export const getMyListings = async()=>{
  try{
  const res = await api.get('/listing/myListing');
  return res.data.listings;
  }catch(err){
    throw err;
  }
}
export default getListings;
export { addListing};