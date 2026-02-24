import { NavLink } from "react-router-dom";
import Logo from '../../assets/images/logo2.png';
import { Home, Building2, PlusSquare, Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

                <div className="flex flex-col gap-3">
                    <img src={Logo} alt="Basera" className="h-14 w-auto object-contain " />
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Find your perfect PG, Flat, or Room across India — broker-free, with direct owner contact.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-3 text-sm">
                        <li>
                            <NavLink to="/" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <Home size={14} />Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/listing" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <Building2 size={14} />Find Listings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/listing/add" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <PlusSquare size={14} />Add Your Property
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold text-base mb-4">Connect</h3>
                    <div className="flex gap-4">
                        <a href="#" aria-label="GitHub" className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                            <Github size={16} />
                        </a>
                        <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                            <Instagram size={16} />
                        </a>
                         <a href="#" aria-label="Linkedin" className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 transition-colors">
                            <Linkedin size={16} />
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-6">Designed for students & professionals seeking hassle-free housing.</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
                © {year} Basera. All rights reserved.
            </div>
        </footer>
    );
}
