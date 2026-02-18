import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx";
export default function App(){
  return(
    <>
    <Navbar/>
    <main className=" ">
    <Outlet/>
    </main>
    {/* <h1 className="w-full h-20 rounded-t-3xl  text-xl flex justify-center items-center bg-orange-400">Footer Coming soon...</h1> */}
    </>
  )
}