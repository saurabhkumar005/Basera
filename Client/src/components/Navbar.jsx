import { NavLink } from "react-router-dom";
import Logo from '../assets/images/logo2.png'
import {Menu, X} from 'lucide-react'
import { useState } from "react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleToggle = ()=>{
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <header className="px-5 w-full h-20  flex justify-between border  items-center bg-[#FAFAFA] shadow-lg " >

            <NavLink className="max-w-[250px] md:w-[200px] h-full block" to="/">
            <img src={Logo} className=" h-full w-full object-fill" />
            </NavLink>

            <div className="flex items-center justify-between  gap-5">
                <div className=" lg:flex justify-evenly gap-8 hidden">
                    <NavLink className="hover:text-[#E98234] ">Find Your Basera</NavLink>
                    <NavLink className="hover:text-[#E98234] ">About</NavLink>
                    <NavLink className="hover:text-[#E98234] ">Contact</NavLink>
                </div>
                <div className=" flex gap-5 items-center justify-end ">
                    <NavLink className="hidden sm:flex rounded-4xl p-3 border text-white bg-[#E98234] hover:text-[#E98234] hover:bg-white">Add Your Listing</NavLink>
                    <NavLink className="border rounded-4xl p-3 hover:bg-[#E98234] hover:text-white">Login/Register</NavLink>
                </div>
            
            {/* //Mobile menu button */}
            <button onClick={handleToggle} type="button" className="lg:hidden" >
                {isMenuOpen ? <X aria-label="Close Menu" className=" w-7 h-7"></X> : <Menu className=" w-7  h-7" />}
            </button>
           
            </div>
            {/* mobile menu */}
             {/* if mobile menu is open */}
            {isMenuOpen &&  <div className=" w-[200px]  rounded-xl border-y absolute top-20 right-3 inset-x bg-white border-t shadow-xl lg:hidden
             transform transition-all duration-200 ease-in-out z-10">
                <nav className="flex flex-col   divide-y divide-gray-300">
                     <NavLink className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-xl hover:text-[#E98234] ">Find Your Basera</NavLink>
                    <NavLink className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-[#E98234] ">About</NavLink>
                    <NavLink className="py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-[#E98234] ">Contact</NavLink>
                    <NavLink className=" sm:hidden py-3 px-5 rounded-xl hover:bg-orange-100 hover:shadow-x hover:text-[#E98234] ">Add Your Listings</NavLink>
                </nav>
            </div>
            }
        </header>
    )
}

