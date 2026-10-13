import { useNavigate, Link } from "react-router"
import MobileMenu from "../../../components/mobileMenu"
import { ArrowLeft, User, Palette, Hammer, ChevronRight, LogOut } from "lucide-react";
import LogoutModal from "../components/logoutModal";
import { useState } from "react";

export default function SettingsPage(){
    const navigate =  useNavigate();
    const [openModal, setOpenModal] = useState(false);


    return(
        <div>
            {/* Nav */}
            <nav className="flex justify-between items-center px-2 py-4">
                <div className="flex justify-center items-center gap-2 px-2">
                    <button 
                    onClick={() => navigate(-1)}
                    className="">
                        <ArrowLeft size={20}/>
                    </button>
                    <h1 className="font-semibold text-lg">settings</h1>
                </div>

                <MobileMenu />
            </nav>

            <div className="flex justify-center items-center border border-gray-300">
                <div className="text-center px-4 py-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary-light rounded py-6 flex justify-center items-center rounded-full w-24 h-24">
                            <p className="font-bold text-primary text-2xl">AB</p>
                        </div>                        
                    </div>
                    <h4  className="font-bold">Ama Boateng</h4>
                    <Link className="text-primary">
                        Artisan
                    </Link>
                </div>
            </div>

            <div>
                <button
                onClick={() => navigate("/profile")}
                className="flex items-center justify-between border-b border-neutral-300 w-full px-4 py-5"
                >
                    <div className="flex items-center gap-3">
                       <User size={20}/> 
                       <div className="">
                            <p className="text-left">Profile</p>                       
                            <p className="text-left text-xs text-neutral-500">Change number, username</p>                         
                       </div>
                    </div>
                    <ChevronRight />
                </button>

                <button
                className="flex items-center justify-between border-b border-neutral-300 w-full px-4 py-5"
                >
                    <div className="flex items-center gap-3">
                       <Palette size={20}/> 
                       <div className="">
                            <p className="text-left">Appearance</p>                       
                            <p className="text-left text-xs text-neutral-500">Dark mode, app theme</p>                         
                       </div>
                    </div>
                    <ChevronRight />
                </button>

                <button
                className="flex items-center justify-between border-b border-neutral-300 w-full px-4 py-5"
                >
                    <div className="flex items-center gap-3">
                       <Hammer size={20}/> 
                       <div className="">
                            <p className="text-left">Switch to artisan</p>                       
                            <p className="text-left text-xs text-neutral-500">Set up a storefront and sell your work</p>                         
                       </div>
                    </div>
                    <ChevronRight />
                </button>

                <button
                onClick={() => setOpenModal(true)}
                className="flex items-center justify-between border-b border-neutral-300 w-full px-4 py-5"
                >
                    <div className="flex items-center gap-3 text-red-500">
                       <LogOut size={20}/> 
                       <p>Logout</p>                       
                    </div>
                </button> 
                {openModal && <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />}               
            </div>
        </div>
    )
}