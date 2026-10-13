import { Link } from "react-router"
import { ShoppingBag } from "lucide-react"; 


export default function StorefrontItemCard({id, name, slug, storefrontSlug, image, status, description, price}) {

    const statusStyles = {
    Available: "text-green-700 border-1 border-green-700",
    "Made-to-order": "text-orange-300 border-1 border-orange-300",
    Sold: "text-red-600 border-1 border-red-600",
    };    

    return(
        <Link 
        to={`/storefront/${storefrontSlug}/items/${slug}`}
        className="border border-gray-300 rounded-xl"
        key={id}
        >
            <div className="relative flex justify-center items-center h-25 border-b border-gray-300 bg-gray-200 text-gray-400 rounded-t-xl">
                {image ? <img src="" alt=""/> : <ShoppingBag /> }
            </div>
            <div className="px-2 py-3">
                <div className={`inline-block text-xs tracking-tight rounded-md px-2 mb-1 ${statusStyles[status]}`}>
                    {status}
                </div> 

                <h1 className="font-bold truncate tracking-tighter">{name}</h1>
            
                <p className="mb-3 text-sm truncate">{description}</p>
                <p className="font-semibold text-gray-400">GH₵ {price}</p>
            </div>
        </Link>        
    )
}