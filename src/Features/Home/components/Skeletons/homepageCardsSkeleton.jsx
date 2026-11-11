
import Skeleton from "react-loading-skeleton";

export default function HomepageCardsSkeleton() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="border border-gray-300 rounded-xl overflow-hidden"
                >
                    {/* Image section */}
                    <div className="relative flex items-center justify-center h-25 bg-gray-200 rounded-t-xl">
                        {/* Status badge */}
                        <Skeleton
                            width={65}
                            height={18}
                            borderRadius={4}
                            className="absolute top-2 left-2"
                        />

                        {/* Product image placeholder */}
                        <Skeleton
                            width={32}
                            height={32}
                            borderRadius={6}
                        />
                    </div>

                    {/* Product details */}
                    <div className="px-2 py-2">
                        {/* Product name */}
                        <Skeleton width="80%" height={20} />

                        {/* Description */}
                        <div className="mt-1 mb-3">
                            <Skeleton count={1} height={16} />
                        </div>

                        {/* Price */}
                        <Skeleton width="45%" height={18} />
                    </div>
                </div>
            ))}
        </div>
    );
}
