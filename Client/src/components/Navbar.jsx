import { NavLink } from "react-router-dom";
import Logo from '../assets/images/logo2.png'
export default function Navbar(){
    return(
        <div className="px-5 w-full h-20  flex justify-between border  items-center bg-[#FAFAFA]" >
            <div className="w-[250px] h-full">
                <NavLink className="w-full h-full block" to="/"><img src={Logo} className=" h-full w-full object-fill"/></NavLink>
            </div>
            <div className="flex items-center justify-between w-[45vw] ">
                <div className="w-full md:flex justify-evenly gap-8 hidden"> 
                    <NavLink>Find Your Basera</NavLink>
                    <NavLink>About</NavLink>
                    <NavLink>Contact</NavLink>
                </div>
                <div className="w-full flex gap-3 items-center justify-end">
                    <NavLink className="rounded-4xl p-3 border text-white bg-[#E98234] hover:text-[#E98234] hover:bg-white">Add Your Listing</NavLink>
                    <NavLink className="border rounded-4xl p-3 hover:bg-[#E98234] hover:text-white">Login/Register</NavLink>
                </div>
            </div>
        </div>
    )
}

const styles = {
    NavLink:hover
}