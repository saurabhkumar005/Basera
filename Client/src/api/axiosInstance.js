import axios from 'axios'

const api = axios.create({baseURL: `${import.meta.env.VITE_SERVER_URL}/api` });

// interceptors are middleware runned by axios whenever request 
// is going from axios to server or response is coming from server

// this middleware will be run everytime a request/calll to server happend from frintend
api.interceptors.request.use((config)=>{
    // checking if jwt tpken is available in local storage
    // jwt token available = user had already logged in previosuly, so, can show protected routes
    
    const token = localStorage.getItem("token");
    if(token){
        // if logged in, add jwt token to current response object as
        // backend will check it for protected route and only allow to visit it
        // once your token is verified  by server/jwt
        config.headers.Authorization = `Bearer: ${token}`;
    }
    // return modified config to proceed to server
    return config;
})


// if jwt token is expired , token is not deleted from local storage, so it will be still there
    // and user can  see protected routes but once they clicked on any button, link 
    // whcih send a request to any protected route from backend, server will verify 
    // jwt token atached and, they found expired time in token , so they send response with 401 error 
    // for unauthorized access and 
    // axios response interceptor will check and if error with 401 is there
    // user will be redirected to login page automatically

    // axios response interceptors is a middleware runnned by axios whenever 
    // any response came from server for the request called above

axios.interceptors.response.use((response)=>{
    // if no error came, return response directly
    return response;
},
// error callback function
(error)=>{
    // if error is there and its status is 401 , then remove
    // jwt token if there and redirect to llogin page
    if(error.response && error.response.status===401){
        localStorage.removeItem("token");
        windows.location.href = '/login';
    }
})
export default api;