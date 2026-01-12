import { Navigate, Outlet } from "react-router-dom";
import { getJWTToken } from "../utils/Auth";
export default function PublicRoute(){
    const token = getJWTToken();

    if(!token){
        return  <Outlet/>;
    }
    return <Navigate to="/" replace/>;
}