import { X, UserRoundPlus, Camera, Trash, User, Mail, Phone } from 'lucide-react'
import anime from "../assets/images/anime.jpg"
import { useState, useEffect } from 'react'
import api from "../api/axiosInstance";



export default function EditProfile({onClose, user, onUpdate}) {
    const [userImage, setUserImage] = useState(user?.avatarUrl || null);
    const [globalError, setGlobalError] = useState(null);
    const [deleteAvatar, setDeleteAvatar] = useState(false);
    const [rawImage, setRawImage] = useState(null);
    const [formData, setFormData] = useState({name: user?.name || "",
         email: user?.email || "", phone: user?.phone || ""});
    const handleImageChange = (e) => {
        const dp = e.target.files[0];
        setRawImage(dp);
        if (dp) {
            setDeleteAvatar(false);
            setUserImage(URL.createObjectURL(dp));
        }
    }
    const handleFormData = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setGlobalError(null);
        const userData = new FormData();
        userData.append('name', formData.name);
        userData.append('email', formData.email);
        userData.append('phone', formData.phone);
        userData.append('deleteAvatar', deleteAvatar);
        if(rawImage){
        userData.append('avatar',rawImage);
        }
        try{
         const result = await api.patch('user/updateProfile', userData);
         console.log("Updation done:" , result.data.user);
         onUpdate(result.data.user);
         onClose();

        }catch(err){
            // console.error("Update Profile failed: ",err.response.data.message);
            setGlobalError(err.response.data.message);
           
        }
    }
    
    useEffect(()=>{
        document.body.style.overflow="hidden";
        return ()=>document.body.style.overflow="unset";
    },[])
    return (
        <div className=" fixed inset-0 flex justify-center items-center w-full h-full z-50" onClick={onClose}>
            <div onClick={(e)=>e.stopPropagation()} className="relative bg-white w-full max-w-md  shadow-2xl overflow-hidden rounded-2xl ">
                <div className="  relative bg-orange-400 text-2xl p-3 text-center font-bold rounded-t-xl">
                    Edit Profile
                    <X onClick={onClose} size={25} className="absolute right-4 top-4 cursor-pointer text-bold pointer transform duration-200 ease-in-out hover:-translate-y-[0.1rem]" />
                </div>

                {/* picture upload area */}
                <div className=' relative w-full p-3 flex justify-center'>
                    <div className='relative '>
                        <div className=' flex justify-center items-center bg-gray-700 text-white w-32 h-32 rounded-full  overflow-hidden'>
                            {userImage ? <img className='w-full h-full object-cover object-top ' src={userImage} />
                                : <label >
                                    <UserRoundPlus size={39} className='hover:scale-105 transform duration-300' />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className='hidden'
                                        onChange={handleImageChange}
                                    />
                                </label>}
                            <label className='absolute right-0 bottom-0'>
                                <Camera size={34} className='bg-orange-400 rounded-full p-1 absolute bottom-0 right-0  transition hover:scale-104 transform duration-200 ease-in-out' />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className='hidden'
                                    onChange={handleImageChange}
                                />
                            </label>
                            <div onClick={()=>{setUserImage(null);setRawImage(null);setDeleteAvatar(true);}} className='hover:scale-105 transform duration-200 ease-in-out absolute left-0 bottom-0 bg-orange-400 p-1 rounded-full '>
                                <Trash />
                            </div>
                        </div>
                    </div>
                </div>


                {/* error details */}
                {globalError && <div className='text-red-500 text-center font-bold  '>Error: {globalError}</div>}


                {/* user details */}
                <form onSubmit={handleSubmit} className='px-6 space-y-5 '>
                <InputGroup name={"name"} label={"Name"} icon={<User/>} onChange={handleFormData} placeholder={"Enter Your name"} value={formData.name}/>
                 {/* <InputGroup name={"email"} label={"Email"} icon={<Mail/>} onChange={handleFormData} placeholder={"Enter Your Email ID"} value={formData.email}/> */}
                  <InputGroup name={"phone"} label={"Phone Number"} icon={<Phone/>} onChange={handleFormData} placeholder={"Enter Your Phone Number"} value={formData.phone}/>
            <button type="submit" className='w-full p-2 text-gray-700 rounded-2xl font-bold text-lg bg-orange-500 hover:-translate-y-[0.1rem] transform duration-200 ease-in-out mb-6'>Save Changes </button>
               </form>
            </div>
        </div>
    )
}

function InputGroup({ label, name, icon, onChange, placeholder, value }) {
    return (
        <div className='group w-full'>
            <label 
                htmlFor={name} 
                className='block text-sm font-bold text-gray-500 mb-1 transition-colors group-hover:text-orange-500 group-focus-within:text-orange-600'
            >
                {label}
            </label>

            <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-all duration-200 group-hover:border-orange-400 group-focus-within:border-orange-500 group-focus-within:ring-2 group-focus-within:ring-orange-100 bg-gray-50 group-focus-within:bg-white'>
                <div className='text-gray-400 group-focus-within:text-orange-500 transition-colors'>
                    {icon}
                </div>
                <input 
                    type="text" 
                    id={name}
                    name={name} 
                    placeholder={placeholder}
                    onChange={onChange}
                    className='w-full ml-3 bg-transparent outline-none text-gray-700 font-medium placeholder-gray-400'
                    value={value}
                />
            </div>
        </div>
    );
}