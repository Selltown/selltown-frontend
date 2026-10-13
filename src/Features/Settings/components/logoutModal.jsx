import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/context/AuthContext"
import { LogOut } from "lucide-react";

export default function LogoutModal({openModal, setOpenModal}) {
    const {logout} = useAuth();
    const navigate = useNavigate();
    
    async function handleLogout() {
        await logout();
        navigate("/login");
    }  

    return (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
        //     <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white px-6 py-5 space-y-4">
        //         {/* Header */}
        //         <h1 className="font-bold text-xl">Logout</h1>
        //         <p className="text-lg">Are you sure you want to log out?</p>
        //         <div className="flex gap-3 items-center">
        //             <button
        //             onClick={handleLogout}
        //             className="border px-3 py-2 w-[90px] rounded-md"
        //             >
        //                 Yes
        //             </button>                  
        //             <button
        //             onClick={() => setOpenModal(false)}
        //             className="border px-3 py-2 w-[90px] rounded-md"
        //             >
        //                 No
        //             </button>               
        //         </div>

        //     </div>
        // </div>  
        
        // Response 1
        <div className={
            `fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs px-4 transition-opacity duration-500 ${openModal ? "opacity-100" : "opacity-0 pointer-events-none"}`
        }
            onClick={() => setOpenModal(false)}
        >
            <div className={
                `w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl transition-all duration-500 ease-out ${openModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}`
            }>

                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">
                        Log out?
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Are you sure you want to log out of your account?
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 active:scale-[0.98]"
                    >
                        Log out
                    </button>
                </div>

            </div>
        </div>
        
        // Response 2
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
        //     <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">

        //         {/* Content */}
        //         <div className="px-6 pt-6 pb-5">
        //             <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-50 mb-4">
        //                 <LogOut className="w-5 h-5 text-red-500" />
        //             </div>

        //             <h1 className="text-lg font-semibold text-gray-900">
        //                 Log out?
        //             </h1>

        //             <p className="mt-2 text-sm leading-6 text-gray-500">
        //                 Are you sure you want to log out of your account?
        //             </p>
        //         </div>

        //         {/* Actions */}
        //         <div className="flex gap-3 px-6 pb-6">
        //             <button
        //                 onClick={() => setOpenModal(false)}
        //                 className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        //             >
        //                 Cancel
        //             </button>

        //             <button
        //                 onClick={handleLogout}
        //                 className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
        //             >
        //                 Log out
        //             </button>
        //         </div>

        //     </div>
        // </div>        
        

    )
}