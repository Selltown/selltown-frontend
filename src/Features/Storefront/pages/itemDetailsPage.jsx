import { useParams } from "react-router"
import { FaWhatsapp  } from 'react-icons/fa'
import { FilePen, FilePenLine } from "lucide-react";
import { useState } from "react";
import ItemFormModal from "../components/itemformModal";
import PageHeader from "../../../components/pageHeader";
import { STOREFRONTS } from "../../../data/storefronts";

export default function ItemDetailsPage() {
    const [editingItem, setEditingItem] = useState(null);
    const { slug, itemSlug } = useParams();

    const storefront = STOREFRONTS.find((s) => s.slug === slug);
    const item = storefront?.items.find((i) => i.slug === itemSlug);

    return (
        <div className="">
            {/* Nav */}
            <PageHeader title={slug} />

            <main className="pt-15">
                {/* Image Container */}
                <div className="border border-gray-300 h-72">
                </div>

                {/* Item info */}
                <div className="space-y-2 p-4 border-b border-gray-300">
                    <div className="flex justify-between item-center">
                        <p className="font-bold text-lg">{item.slug}</p>
                        <button onClick={() => setEditingItem(true)}>
                            <FilePen className="text-primary" size={25}/>                        
                        </button>
                    </div>

                    <p className="text-2xl font-semibold">GH₵ {item.price}</p>

                    <div className="mb-3">
                        <h4 className="mb-2">Description</h4>
                        <p>{item.description}</p>
                    </div>
                </div>

                {/* Seller info */}
                <div className="p-4 space-y-4">
                    <p className="text-sm">Sold by</p>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-light text-primary p-3 rounded-full font-semibold">
                            AB
                        </div>
                        <div>
                            <p className="text-md font-semibold">{storefront.name}</p>
                            <p className="text-sm">{storefront.location}</p>
                        </div>
                    </div>

                    <button className="flex justify-center mt-3 px-4 py-4 w-full rounded-lg bg-green-600" >
                        <div className="flex gap-2 items-center text-white font-semibold ">
                            <FaWhatsapp size={20}/><span>Send order on Whatsapp</span>
                        </div>
                    </button>
                </div>
            </main>

            {editingItem && <ItemFormModal mode="edit" onClose={() => setEditingItem(null)} />}
            
        </div>
    )
}