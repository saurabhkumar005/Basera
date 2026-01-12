import { StrictMode,  } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import AddListing from './pages/AddListing.jsx'
import ListingDetails from './pages/ListingDetails.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import PublicRoute from './routes/PublicRoute.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App/>} >
    
      <Route index element={<Home/>}/>
      <Route path="listing" element={<Listing/>}/>
      <Route path="listing/:id" element={<ListingDetails/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/listing/add" element={<AddListing/>}/>
      </Route>

    </Route>
    <Route element={<PublicRoute/>}> 
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    </Route>
    </>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={routes}/>
  </StrictMode>
)
