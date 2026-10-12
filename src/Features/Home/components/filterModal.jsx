
export default function FilterModal({openFilter, setOpenFilter}) {

    const CRAFTS = ["Textiles", "Pottery", "Leather", "Beadwork", "Woodwork", "Basketry"];

    return(
        <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
                openFilter ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}   
            onClick={() => setOpenFilter(false)}   
        >
            {/* Filter sheet */}
            <div
            className="h-full flex items-center z-60 justify-center"
            >
                <div 
                onClick={(e) => e.stopPropagation()}
                className="w-[90%] mx-auto bg-background">
                    <div className="flex items-center justify-between p-4 border-b border-gray-300">
                        <span className="font-bold text-xl">Filters</span>
                        <button
                        >
                            <p className="text-sm text-primary">Clear all</p>
                        </button>                                
                    </div>    

                    <form className=" px-3 py-10 py-6 space-y-5 text-sm">
                        <div>
                            <label className="block text-gray-600 mb-1">
                            Craft
                            </label>
                            <select             
                            defaultValue=""
                            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 outline-none transition
                                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
                                // ${errors.craft ? "border-red-400" : "border-gray-300"}`}
                            >
                            <option value="" disabled>Select your craft</option>
                            {CRAFTS.map((craft, i) => (
                                <option key={i} value="">{craft}</option>
                            ))}
                            </select>
                        </div>   

                        <div className='flex flex-col space-y-2 mb-3'>
                            <label className='text-gray-600 text-sm'>Location</label>
                            <input className="border border-gray-300 text-sm p-2 rounded-lg w-full h-10 placeholder-gray-300 transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75] focus:outline-none" />
                        </div>

                        <div className='flex flex-col space-y-2 mb-3'>
                            <label className='text-gray-600 text-sm'>Craft description</label>
                            <textarea
                            className="border border-gray-300 text-sm p-2 rounded-lg w-full placeholder-gray-300 transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75] focus:outline-none"
                            >
                            </textarea>
                        </div> 

                        <button

                        className="w-full text-white bg-primary py-3 rounded-lg"
                        >
                            Apply filters
                        </button>                               
                    </form>
                </div>
            </div>
        </div>                    
    )
}