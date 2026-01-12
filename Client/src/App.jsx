import { Outlet } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx";
export default function App(){
  return(
    <>
    <Navbar/>
    <main className=" ">
    <Outlet/>
    </main>
    <h1>Footer here</h1>
    </>
  )
}