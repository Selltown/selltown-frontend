import { useParams } from "react-router"
import { CircleAlert, MapPin, Store, Image, LinkIcon, Copy, Check, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import ItemFormModal from "../components/itemformModal"
import PageHeader from "../../../components/pageHeader"
import StorefrontItemCard from "../components/storefrontItemCard"
import { fetchStorefrontItems, fetchStorefrontData } from "../services/storefrontService"
import { slugify } from "../../Home/utils/slugify"
import Pagination from "../../../components/pagination"
import { useAuth } from "../../Auth/context/AuthContext"
import EditModal from "../components/editModal"
import StorefrontDetailsSkeleton from "../components/skeletons/storefrontDetailsSkeleton"
import StorefrontItemsSkeleton from "../components/skeletons/storefrontItemsSkeleton"


export default function StorefrontPage(){
    const { user, setUser } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { slug } = useParams();
    const [storefrontData, setStorefrontData] = useState();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const PAGE_SIZE = 10;
    const goToPage = (number) => {
        setPage(number);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    const totalPages = Math.ceil(count/ PAGE_SIZE);
    const isOwner = user?.storefront_id === storefrontData?.storefront.id;
    
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

    async function handleCopyClick() {
        const url = `${window.location.origin}/${storefrontData?.current_slug}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy storefront link:", error);
        }
    }

    function handleStorefrontUpdated(updated){
        setUser((prev) => ({
                ...prev,
                storefront_name: updated.name,
                current_slug: updated.current_slug
            }))
        setStorefrontData((prev) => ({
            ...prev,
            current_slug: updated.current_slug,
            storefront: {
                ...prev.storefront,
                name: updated.name,
            }
        }))
    }
    
    return(
        <div>
            {/* nav */}
            <PageHeader title="storefront" />

            <main className="pt-15">
                <div className="flex justify-center items-center bg-gray-200 h-48">
                    <Image className="text-gray-400" size={30} />
                </div>

                <div className="px-4 py-4 border-b border-gray-300">

                {!storefrontData ? (
                    <StorefrontDetailsSkeleton />
                ) : (
                    <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                            <Store className="text-gray-500" size={16} />
                            <h4 className="text-sm font-semibold">{storefrontData?.storefront.name}</h4> 

                            {isOwner && (
                            <button
                             onClick={() => setEditModal(true)}
                             className="text-gray-500 hover:text-primary transition-colors"
                            >
                                <Pencil size={15} />
                            </button>
                            )}                          
                        </div>

                        <div className="flex gap-2 items-center">
                            <LinkIcon className="text-gray-500" size={16} />

                            <span className="text-primary text-sm">
                                {`selltown.gh/${storefrontData?.current_slug}`}
                            </span>

                            <button
                                onClick={() => handleCopyClick()}
                                className="text-gray-500 hover:text-primary transition-colors"
                                title="Copy storefront link"
                                aria-label="Copy storefront link"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>

                            {copied && (
                                <span className="text-xs text-green-600">Copied!</span>
                            )}
                        </div>                        


                        <div className="flex gap-2 items-center">
                            <MapPin className="text-gray-500" size={16} />
                            <p className="text-sm text-neutral-500">{storefrontData?.storefront.location.full_address}</p>
                        </div>
                    </div>
                )}
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
                            <StorefrontItemsSkeleton />
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
            {editModal && 
                <EditModal 
                onClose={() => setEditModal(false)} 
                id={storefrontData?.storefront.id}
                onUpdated={handleStorefrontUpdated} 
            />}
        </div>
    )
}