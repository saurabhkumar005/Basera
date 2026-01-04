import { StrictMode,  } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Listing from './pages/Listing.jsx'
import AddListing from './pages/AddListing.jsx'
import ListingDetails from './pages/listingDetails.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App/>} >
      <Route index element={<Home/>}/>
      <Route path="listing" element={<Listing/>}/>
      <Route path="/listing/add" element={<AddListing/>}/>
      <Route path="listing/:id" element={<ListingDetails/>}/>
    </Route>
    <Route path="/register" element={<Register/>}/>
    </>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={routes}/>
  </StrictMode>
)
