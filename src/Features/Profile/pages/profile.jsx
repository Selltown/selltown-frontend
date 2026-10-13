import { ArrowLeft, Camera } from "lucide-react"
import MobileMenu from "../../../components/mobileMenu"
import { useNavigate } from "react-router"
import PageHeader from "../../../components/pageHeader";


export default function ProfilePage(){
    const navigate = useNavigate();

    return (
        <div>
            {/* Nav */}
            <PageHeader title="Profile" />

            <main className="pt-20">
                <div className="flex justify-center items-center border-b border-neutral-300">
                    <div className="text-center px-4 py-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative bg-primary-light rounded py-6 flex justify-center items-center rounded-full w-24 h-24">
                                <p className="font-bold text-primary text-2xl">AB</p>
                                <button className="absolute z-20 bottom-2 right-0 bg-background w-8 h-8 rounded-full text-primary flex justify-center items-center">
                                    <Camera size={18} />
                                </button>
                            </div>                        
                        </div>
                        <h4  className="font-bold">Ama Boateng</h4>
                        <p className="text-primary">
                            Artisan
                        </p>
                    </div>
                </div>

                <div className="px-4 py-5 space-y-5">
                    <div className="">
                        <p className="font-semibold">Name</p>
                        <p className="text-sm text-neutral-400">Ama Boateng</p>
                    </div>
                    <div className="">
                        <p className="font-semibold">Phone Number</p>
                        <p className="text-sm text-neutral-400">0594121200</p>
                    </div>
                    <div className="">
                        <p className="font-semibold">Craft</p>
                        <p className="text-sm text-neutral-400">Hand-dyeing & Batik</p>
                    </div>
                    <div className="">
                        <p className="font-semibold">Craft Description</p>
                        <p className="text-sm text-neutral-400">Hand-dyeing and weaving batik fabric, blending traditional Ghanaian patterns with modern silhouettes.</p>
                    </div>
                    <div className="">
                        <p className="font-semibold">Location</p>
                        <p className="text-sm text-neutral-400">Makola Central</p>
                    </div>                                
                </div>                
            </main>
        </div>            
    )
}