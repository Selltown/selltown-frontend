import { Link, useParams } from "react-router"
import { IoBasketOutline } from 'react-icons/io5'
import { useEffect, useState } from "react"
import ItemFormModal from "../components/itemformModal"
import PageHeader from "../../../components/pageHeader"
import StorefrontItemCard from "../components/storefrontItemCard"
import { fetchStorefrontItems } from "../services/storefrontService"
import { slugify } from "../../Home/utils/slugify"
import Pagination from "../../../components/pagination"


export default function StorefrontPage(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { storefrontId, slug } = useParams();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const PAGE_SIZE = 10;
    const goToPage = (number) => {
        setPage(number);
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    const totalPages = Math.ceil(count/ PAGE_SIZE);

    // console.log(storefrontId)

    useEffect(() => {
        async function loadItems() {
            setLoading(true);
            setError("");

            try {
                const response = await fetchStorefrontItems(storefrontId);
                setItems(response.results)
                setCount(response.count)
                // console.log(response);
            } catch (error) {
                setError("Failed to load storefront items.")
                console.log(error)
            } finally {
                setLoading(false);
            }
            
        } if(storefrontId) {
            loadItems();
        }
    }, [storefrontId])
    
    return(
        <div>
            {/* nav */}
            <PageHeader title="storefront" />

            <main className="pt-20">
                <div className="flex justify-center items-center border-b border-gray-300">
                    <div className="text-center px-4 py-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary-light w-[30%] rounded p-6 flex justify-center items-center rounded-lg">
                                <IoBasketOutline className="text-primary" size={25}/>
                            </div>                        
                        </div>
                        <h4  className="font-bold">Storefront name goes here</h4>
                        <Link className="text-primary">
                            {`selltown.gh/${slug}`}
                        </Link>

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