import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo2.png'
import { Menu, X, UserRound } from 'lucide-react'
import { useState, useRef, useEffect } from "react";
import { getJWTToken } from "../../utils/Auth";
import { useAuthContext } from "../../context/AuthContext";

const navLinkClass = ({ isActive }) =>
    `relative font-medium transition-colors duration-200 hover:text-orange-500 ${isActive
        ? 'text-orange-500 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-orange-400 after:rounded-full'
        : 'text-gray-600'
    }`;

const mobileNavLinkClass = ({ isActive }) =>
    `py-3 px-5 rounded-xl font-medium transition-all duration-150 ${isActive
        ? 'bg-orange-50 text-orange-500 font-semibold border-l-4 border-orange-400'
        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
    }`;

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, user, setUser } = useAuthContext();
    const menuRef = useRef(null);

    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
        setIsMenuOpen(false);
        navigate("/login");
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header ref={menuRef} className="sticky top-0 z-50 bg-[#FAFAFA] backdrop-blur-md shadow-sm">
            <div className="px-5 h-20 flex justify-between items-center max-w-screen-2xl mx-auto">

                <NavLink className="max-w-[200px] h-16 block" to="/" onClick={closeMenu}>
                    <img src={Logo} className="h-full w-full object-contain" alt="Basera Logo" />
                </NavLink>
                <div className="hidden lg:flex items-center gap-8">
                    <NavLink to='/listing' className={navLinkClass}>Find Your Basera</NavLink>
                </div>
                <div className="flex gap-4 items-center">
                    <NavLink
                        to="/listing/add"
                        className="hidden sm:flex items-center rounded-full px-5 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        + Add Listing
                    </NavLink>
                    {!isAuthenticated ? (
                        <NavLink
                            to="/login"
                            className="border-2 border-orange-400 rounded-full px-5 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hidden lg:flex border-2 border-orange-400 rounded-full px-5 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                            Logout
                        </button>
                    )}

                    {isAuthenticated && (
                        <NavLink to='/profile' className="flex items-center gap-2 group">
                            {user?.avatarUrl
                                ? <img src={user.avatarUrl} className="w-11 h-11 object-cover object-top rounded-full border-2 border-transparent group-hover:border-orange-400 transition-all duration-200" alt="Avatar" />
                                : <UserRound className="w-11 h-11 p-1.5 rounded-full border-2 border-gray-200 group-hover:border-orange-400 text-gray-500 transition-all duration-200" />
                            }
                        </NavLink>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        type="button"
                        className="lg:hidden p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen
                            ? <X size={28} className="text-orange-500" />
                            : <Menu size={28} className="text-gray-700" />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 border-t border-slate-100' : 'max-h-0'}`}>
                <nav className="flex flex-col px-3 py-2 bg-white gap-1">
                    <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClass} end>Home</NavLink>
                    <NavLink to="/listing" onClick={closeMenu} className={mobileNavLinkClass}>Find Your Basera</NavLink>
                    <NavLink to="/listing/add" onClick={closeMenu} className={mobileNavLinkClass}>Add Your Listing</NavLink>
                    {isAuthenticated && (
                        <>
                            <NavLink to="/profile" onClick={closeMenu} className={mobileNavLinkClass}>
                                My Account {user?.name ? `(${user.name})` : ''}
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-left py-3 px-5 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
