import { Link, useParams } from "react-router"
import { CircleAlert, MapPin, Store, Image } from "lucide-react"
import { LinkIcon } from "lucide-react"
import { useEffect, useState } from "react"
import ItemFormModal from "../components/itemformModal"
import PageHeader from "../../../components/pageHeader"
import StorefrontItemCard from "../components/storefrontItemCard"
import { fetchStorefrontItems, fetchStorefrontData } from "../services/storefrontService"
import { slugify } from "../../Home/utils/slugify"
import Pagination from "../../../components/pagination"


export default function StorefrontPage(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { slug } = useParams();
    const [storefrontData, setStorefrontData] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const PAGE_SIZE = 10;
    const goToPage = (number) => {
        setPage(number);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    const totalPages = Math.ceil(count/ PAGE_SIZE);
    

    useEffect(() => {
        async function loadItems() {
            setLoading(true);
            setError("");

            try {
                const response = await fetchStorefrontItems(slug, page);
                setItems(response.results)
                setCount(response.count)
            } catch (error) {
                setError("Failed to load storefront items.")
                console.log(error)
            } finally {
                setLoading(false);
            }
            
        } if(slug) {
            loadItems();
        }
    }, [page])

    useEffect(() => {
        async function loadStorefrontData() {
            setLoading(true);
            setError("");

            try {
                const response = await fetchStorefrontData(slug);
                // console.log(response);
                setStorefrontData(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
            
        } if(slug) {
            loadStorefrontData();
        }
    }, [])
    
    return(
        <div>
            {/* nav */}
            <PageHeader title="storefront" />

            <main className="pt-15">
                <div className="flex justify-center items-center bg-gray-200 h-48">
                    <Image className="text-gray-400" size={30} />
                </div>

                <div className="px-4 py-4 border-b border-gray-300">
                    <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                            <Store className="text-gray-500" size={16} />
                            <h4 className="text-sm font-semibold">{storefrontData?.storefront.name}</h4>                           
                        </div>

                        <div className="flex gap-2 items-center">
                            <LinkIcon className="text-gray-500" size={16} />
                            <Link className="text-primary text-sm">
                                {`selltown.gh/${storefrontData?.current_slug}`}
                            </Link>                            
                        </div>


                        <div className="flex gap-2 items-center">
                            <MapPin className="text-gray-500" size={16} />
                            <p className="text-sm text-neutral-500">Dansoman, Accra • Greater Accra Region</p>
                        </div>                        
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <p>Items</p>
                        <div 
                        onClick={() => setShowCreateModal(true)}
                        className="bg-primary-light text-primary px-4 py-2 font-semibold rounded-lg">
                            + Create Item
                        </div>
                    </div>

                    {/* Item grid */}
                    <div>
                        {loading ? (
                            <p className='text-center mt-[30%] text-xl font-semibold text-gray-400'>Loading items...</p>
                        ) : error ? (
                            <div className='flex flex-col items-center mt-[30%] text-xl font-semibold text-red-400'>
                                <CircleAlert size={30}/>
                                <p className='mt-3'>{error}</p>                           
                            </div>
                        ) : items.length === 0 ? (
                            <p className='text-center mt-[30%] text-xl font-semibold text-gray-400'>No storefronts items yet</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:gap-4 sm:grid-cols-3 gap-3">
                                {items.map((card) => (
                                    <StorefrontItemCard 
                                    key={card.item_id}
                                    slug={slugify(card.item_name)}
                                    name={card.item_name}
                                    description={card.description}
                                    status={card.status_name}
                                    image={card.image}
                                    price={card.price}
                                    storefrontSlug={slug}
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
 
                </div>
            </main>


            {showCreateModal && <ItemFormModal mode="create" onClose={() => setShowCreateModal(false)} />}
        </div>
    )
}