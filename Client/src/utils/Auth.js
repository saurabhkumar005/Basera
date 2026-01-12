import { jwtDecode } from "jwt-decode";

function getJWTToken(){
    const token = localStorage.getItem("token");
    if(!token)return null;
    // checking if token is available but it is expired, then clear the token and return null
    try{
        const currTime = Date.now()/1000;  //converting millisecond to second
        const decode = jwtDecode(token);
        if(decode.exp<currTime){
            localStorage.removeItem("token");
            return null;
        }
        return token;
    }catch(err){
         // if token is garbage/corrupted then jwtDecode will throw an error, so still do same , remove jwt token and redirect to login page
        localStorage.removeItem("token");
        return null;
    }
}
export {getJWTToken};