import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";

const FooterRoutes = ['/', '/listing'];

export default function App() {
  const { pathname } = useLocation();
  const showFooter = FooterRoutes.includes(pathname);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  )
}