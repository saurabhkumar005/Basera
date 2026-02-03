import api from "./axiosInstance";

export const getUser= async()=>{
    const res = await api.get('/user/profile/');
    // console.log("from useRouteLoaderData.jsx", res.data);
    return res.data;
}