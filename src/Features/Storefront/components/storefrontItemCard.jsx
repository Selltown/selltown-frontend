import { Link } from "react-router"
import { ShoppingBag } from "lucide-react"; 


export default function StorefrontItemCard({id, name, slug, storefrontSlug, image, status, description, price}) {

    const statusStyles = {
    Available: "text-green-700",
    "Made to order": "text-orange-400",
    "Sold Out": "text-red-600 ",
    };    

    return(
        <Link 
        to={`/storefront/${storefrontSlug}/items/${slug}`}
        className="border border-gray-300 rounded-xl"
        key={id}
        >
            <div className="relative flex justify-center items-center h-25  bg-gray-200 text-gray-400 rounded-t-xl">
                <div className={`absolute top-2 left-2 text-[11px] bg-white tracking-tight rounded-sm px-2 ${statusStyles[status]}`}>
                    {status}
                </div>                 
                {image ? <img src="" alt=""/> : <ShoppingBag /> }
            </div>
            <div className="px-2 py-2">
                <h1 className="font-bold text-md truncate tracking-tighter">{name}</h1>
            
                <p className="mb-3 text-[13px] truncate">{description}</p>
                <p className="font-semibold text-sm text-gray-400">GH₵ {price}</p>
            </div>
        </Link>        
    )
}