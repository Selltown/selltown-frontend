import Skeleton from 'react-loading-skeleton'

export default function StorefrontDetailsSkeleton() {
    return (
        <div className='space-y-2'>
            <div className='flex gap-2 items-center'>
                <Skeleton width={16} height={16} />
                <Skeleton width={160} height={16} />
            </div>

            <div className='flex gap-2 items-center'>
                <Skeleton width={16} height={16} />
                <Skeleton width={180} height={16} />
            </div>
            
            <div className='flex gap-2 items-center'>
                <Skeleton width={16} height={16} />
                <Skeleton width={200} height={16} />
            </div>
        </div>
    )
}