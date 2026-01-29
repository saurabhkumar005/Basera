import {useContext, createContext, useEffect, useState} from 'react'
import { getJWTToken } from '../utils/Auth';
import { getUser } from '../api/UserData';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getUserDetails = async()=>{
            const token =  getJWTToken();
            try{
            if(token){
                
                const data = await getUser();
                setUser(data);
                // console.log("from AuthCOntext.jsx: ",data);
            }

        }finally{
            setLoading(false);
        }
        };
        getUserDetails();
    },[]);

    const value = {
        user, loading, setUser, isAuthenticated: !!user,
    };
    return (
        <AuthContext.Provider value={value}>
            {loading? 
            <div className='w-screen h-screen flex justify-center items-center'>
                Getting Your Basera
            </div>
        : children}
        </AuthContext.Provider>
    )
}

export const  useAuthContext = ()=>{
    return useContext(AuthContext);
}