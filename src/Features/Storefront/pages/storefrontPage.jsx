import { ArrowLeft, Menu, ShirtIcon, LucideShoppingBasket, LucideShirt, LucideHeadset, ShoppingBag, Store } from "lucide-react"
import { Link, useParams } from "react-router"
import { IoBasketOutline } from 'react-icons/io5'
import { useState } from "react"
import ItemFormModal from "../components/itemformModal"
import PageHeader from "../../../components/pageHeader"
import { STOREFRONTS } from "../../../data/storefronts"
import StorefrontItemCard from "../components/storefrontItemCard"


export default function StorefrontPage(){
    const { slug } = useParams();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const storefront = STOREFRONTS.find((s) => s.slug === slug);
    
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
                        <h4  className="font-bold">{storefront.name}</h4>
                        <Link className="text-primary">
                            {`artisanmarket.gh/${storefront.slug}`}
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

                    {/* Product grid  */}
                    <div className="">
                        {storefront.items.length > 0 ? (
                            <div className="grid grid-cols-2 sm:gap-4 sm:grid-cols-3 gap-3">
                                {storefront.items.map((card) => (
                                    <StorefrontItemCard 
                                    key={card.id}
                                    slug={card.slug}
                                    name={card.name}
                                    description={card.description}
                                    status={card.status}
                                    image={card.image}
                                    price={card.price}
                                    storefrontSlug={storefront.slug}
                                    />
                                ))}
                            </div>
                        ) : (<div className="text-xl"><p>No Storefront items yet</p></div>)}
                    </div>
 
                </div>
            </main>


            {showCreateModal && <ItemFormModal mode="create" onClose={() => setShowCreateModal(false)} />}
        </div>
    )
}