import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo2.png'
import { Menu, X} from 'lucide-react'
import { useState } from "react";
import { getJWTToken } from "../../utils/Auth";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // checking if user had logged in or not?
    const token = getJWTToken();
    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login");
    }
    const handleToggle = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <header className="px-5  h-20  flex justify-between   items-center bg-[#FAFAFA] shadow-lg " >

            <NavLink className="max-w-[250px] md:w-[200px] h-full block" to="/">
            <img src={Logo} className=" h-full w-full object-fill" />
            </NavLink>

            <div className="flex items-center justify-between  gap-5">
                <div className=" lg:flex justify-evenly gap-8 hidden">
                    <NavLink to='/listing' className="hover:text-[#E98234] ">Find Your Basera</NavLink>
                    <NavLink className="hover:text-[#E98234] ">About</NavLink>
                    <NavLink className="hover:text-[#E98234] ">Contact</NavLink>
                </div>
                <div className=" flex gap-5 items-center justify-end ">
                    <NavLink to="/listing/add" className="hidden sm:flex rounded-4xl p-3 border text-white bg-orange-400 hover:text-orange-400 hover:bg-white">Add Your Listing</NavLink>
                    {!token?
                        (<NavLink onClick={()=>navigate('/login')} className="border rounded-3xl px-6 p-3 hover:bg-orange-400 hover:text-white font-bold  text-orange-400  ">Login Now</NavLink>)
                    :
                     (<NavLink onClick={handleLogout} className="hidden lg:flex border rounded-3xl px-6 p-3 hover:bg-orange-400 hover:text-white font-bold  text-orange-400 ">Logout </NavLink>)
                    }
                </div>
            
            {/* //Mobile menu button */}
            <button onClick={handleToggle} type="button" className="lg:hidden" >
                {isMenuOpen ? <X aria-label="Close Menu" className=" w-7 h-7"></X> : <Menu className=" w-7  h-7" />}
            </button>
           
            </div>
            {/* mobile menu */}
             {/* if mobile menu is open */}
            {isMenuOpen &&  <div className=" w-[200px]  rounded-xl border-y absolute top-20 right-3 inset-x bg-white border-t shadow-xl lg:hidden
             transform transition-all duration-200 ease-in-out z-90">
                <nav className="flex flex-col   divide-y divide-gray-300">
                     <NavLink to="/listing" className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-xl hover:text-orange-500 hover:font-bold hover:py-4">Find Your Basera</NavLink>
                    <NavLink className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-orange-500 hover:font-bold hover:py-4 ">About</NavLink>
                    <NavLink className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-orange-500 hover:font-bold hover:py-4  ">Contact</NavLink>
                    <NavLink to="/listing/add" className=" sm:hidden py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-orange-500 hover:font-bold hover:py-4 ">Add Your Listings</NavLink>
                    {token? 
                    <div onClick={handleLogout} className=" lg::hidden py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-orange-500 hover:font-bold  hover:py-4 " >Logout </div>
                    : null}
                </nav>
            </div>
            }
        </header>
    )
}

