import { useNavigate } from 'react-router'
import { LucideHammer, Bell, Menu, SlidersHorizontal, ChevronDown, Search, X, Store } from "lucide-react";
import { useState } from "react";
import FilterModal from "../components/filterModal";
import MobileMenu from "../../../components/mobileMenu";
import StorefrontCard from '../components/storefrontCard';
import { STOREFRONTS } from '../../../data/storefronts';

const PAGE_SIZE = 6;

export default function HomePage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const visibleStorefronts = STOREFRONTS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(STOREFRONTS.length / PAGE_SIZE);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const goToPage = (number) => {
        setPage(number);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
  
    
    return(
        <div className=" max-w-4xl mx-auto px-4 py-4">
            <div className="text-gray-600 space-y-5">
                {/* Nav */}
                <nav className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-1 px-2">
                        <div className="bg-primary-light text-primary rounded-lg flex justify-center items-center p-2">
                            <LucideHammer size={20}/>
                        </div>
                        <h1 className="font-semibold text-lg">Selltown</h1>

                    </div>

                    <MobileMenu />
                </nav>

                {/* Search */}
                <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                        <div className="bg-gray-200 flex items-center rounded-lg p-2 w-full">
                            <Search className="text-gray-400" size={20} />
                            <input 
                            className="text-sm px-2 py-1 focus:outline-none w-full" placeholder="Search artisan, storefront, item"
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }} 
                            />
                        </div> 
                        <button 
                        onClick={() => setOpenFilter(true)}
                        className="bg-gray-200 p-3 rounded-lg">
                            <SlidersHorizontal size={20}/>
                        </button>                       
                    </div>
                </div>

                {/* Storefront banner */}
                <div className="flex justify-between items-center px-4 py-5 bg-primary-light rounded-xl">
                    <div className="">
                        <h4 className="text-sm text-primary mb-1">Your storefront</h4>
                        <p className="font-bold">Ama's Batik Studio</p>
                    </div>
                    <button
                    // onClick={() => navigate('/storefront')}
                    className="bg-white text-primary text-sm rounded-lg px-4 py-2"
                    >
                        View
                    </button>
                </div>
                
                {/* Artisan card grid */}
                <div>
                    <p className="mb-3">Browse storefronts</p>
                    <div className="grid grid-cols-2 sm:gap-4 sm:grid-cols-3 gap-3">
                        {visibleStorefronts.map((card) => (
                            <StorefrontCard 
                                key={card.id}
                                slug={card.slug}
                                name={card.name}
                                craft={card.craft}
                                region={card.region}
                                location={card.location}
                                coverImage={''}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {pageNumbers.map((number) => (
                            <button
                            key={number}
                            onClick={() => goToPage(number)}
                            className={`w-8 h-8 rounded-lg text-sm ${
                                page === number ? "bg-primary text-white" : "bg-gray-200"
                            }`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
                                
                {/* Filter sheet overlay */}
                <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter}/>
            </div>
        </div>
    )
} 


