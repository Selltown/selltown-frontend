import { ShoppingBag } from "lucide-react"
import { Link } from "react-router"

export default function StorefrontCard({storefront_id, slug, name, craft, region, location, coverImage}) {

    return (
        <Link
            to={`/storefront/${storefront_id}/${slug}`}
            className="border border-gray-300 rounded-xl"
        >
                <div className="h-20 border-b rounded-t-lg border-gray-300 bg-gray-200 flex justify-center items-center">
                    {coverImage ? <img
                    src=""
                    alt=""
                    /> :  <ShoppingBag />}
                </div>
                <div className="px-2 py-3">
                    <h1 className="font-bold truncate tracking-tight">{name}</h1>
                    <p className="mb-3 text-xs truncate">{craft}, <span>{location}</span></p>
                    <p className="tracking-tight text-xs">{region}</p>
                </div>
        </Link>
        
    )
}