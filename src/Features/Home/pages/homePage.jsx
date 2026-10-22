import { useNavigate } from 'react-router'
import { LucideHammer, SlidersHorizontal, Search, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import FilterModal from "../components/filterModal";
import MobileMenu from "../../../components/mobileMenu";
import StorefrontCard from '../components/storefrontCard';
import { fetchStorefronts } from '../services/homeService';
import Pagination from '../../../components/pagination';
import { slugify } from '../utils/slugify';


export default function HomePage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    const [storefronts, setStorefronts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const PAGE_SIZE = 10;
    const goToPage = (number) => {
        setPage(number);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    const totalPages = Math.ceil(count/ PAGE_SIZE);


    useEffect(() => {
        async function fetchStores() {
            setLoading(true);

            try {
                const response = await fetchStorefronts(page);
                setStorefronts(response.results);
                setCount(response.count);
            } catch (error) {
                setError("Failed to load Storefronts")
                console.log(error)
            } finally {
                setLoading(false);
            }            
        }

        fetchStores();
    }, [page])
  
    
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
                
                {/* Storefront grid */}
                <div>
                    <p className="mb-3">Browse storefronts</p>

                    {loading ? (
                        <p className='text-center mt-[30%] text-xl font-semibold text-gray-400'>Loading storefronts...</p>
                    ) : error ? (
                        <div className='flex flex-col items-center mt-[30%] text-xl font-semibold text-red-400'>
                            <CircleAlert size={30}/>
                            <p className='mt-3'>{error}</p>                           
                        </div>
                    ) : storefronts.length === 0 ? (
                        <p className='text-center mt-[30%] text-xl font-semibold text-gray-400'>No storefronts found</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:gap-4 sm:grid-cols-3 gap-3">
                            {storefronts.map((store) => (
                                <StorefrontCard 
                                    key={store.storefront_id}
                                    storefront_id={store.storefront_id}
                                    slug={slugify(store.name)}
                                    name={store.name}
                                    craft={store.name}
                                    region={store.name}
                                    location={store.name}
                                    coverImage={store.image ?? ""}
                                />
                            ))}
                        </div>                        
                    )}

                    <Pagination
                        page={page} 
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        loading={loading}
                    />
                </div>
                                
                {/* Filter sheet overlay */}
                <FilterModal openFilter={openFilter} setOpenFilter={setOpenFilter}/>
            </div>
        </div>
    )
} 


