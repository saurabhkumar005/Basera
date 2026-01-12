import api from "./axiosInstance.js";

const RegisterUser = async (data) => {
    const res = await api.post('/auth/register', data);
    return res.data;
}
const LoginUser = async(data)=>{
    const res = await api.post('/auth/login', data);
    return res.data;
}

export { RegisterUser, LoginUser };