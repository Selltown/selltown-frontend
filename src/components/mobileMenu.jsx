import { useState } from "react";
import { Menu, X } from "lucide-react"
import { Link } from "react-router";

const MENU = [
    {
        navlink: "Market",
        path: "/home"
    },
    {
        navlink: "My Storefront",
        path: "/storefront"
    },
    {
        navlink: "Order",
        path: ""
    },
    {
        navlink: "Settings",
        path: "/settings"
    },
]

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);    

    return (
        <div>
            <div className="flex justify-center items-center gap-3 p-2">
                <button
                onClick={toggleMenu}
                >
                    <Menu size={19}/>
                </button>
            </div>


            {/* Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}   
                onClick={toggleMenu}   
            >
                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 h-full w-[80%] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden  ${
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}          
                >
                    <div className="p-[20px]">
                        <div className="flex items-center justify-end">
                            <button>
                            <X size={30}/>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            {MENU.map((link, i) => (
                            <Link
                                key={i}
                                to={link.path}
                                className="border-b border-white/10 py-3.5 text-left text-[15.5px] text-cream-100/60"
                            >
                                {link.navlink}
                            </Link>
                            ))}                
                        </div>
                    </div>
                </div>
            </div>                 
        </div>
        
    )
}