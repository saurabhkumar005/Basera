import { Navigate, Outlet } from "react-router-dom";
import { getJWTToken } from "../utils/Auth";

// useNavigate will fail here a sit not return any html and return null
//  but our route is waiting to see html for showing some UI so, it will crash
// to avoid this problem, we will use  Navigate tag which return a component that handle redirect
export default function ProtectedRoute(){
    //only allow to these protected routes if jwt token is available
    const token = getJWTToken();

    // if token not available, redirect to login
    if(!token){
        // replace keyword remove all failed browser history (which had been called but due to lack of jwt token ,it is being redirected to login page and history removed from browser history stack), so user cannot go back to protected route without login
        return <Navigate to='/login' replace/>;
    }
// checking if token is available but it is expired, then still return to login
    
    // otherwise, return outlet for rendering child component of protected routes
    return <Outlet/>;
}