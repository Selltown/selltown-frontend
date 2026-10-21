
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LocationAutocomplete from "../../../components/LocationAutocomplete";
import { filtermodalSchema } from "../schema/filtermodalSchema";
import { useEffect, useState } from "react";
import { fetchCrafts } from "../services/homeService";


export default function FilterModal({openFilter, setOpenFilter}) {
    const [crafts, setCrafts] = useState([]);

    const {register, handleSubmit, control, formState: {errors} } = useForm({
        resolver: zodResolver(filtermodalSchema),
        defaultValues: {
            craft: "",
            location: null
        }
    })

    useEffect(() => {
        async function loadOptions() {
            try {
                const craftsResponse = await fetchCrafts();
                setCrafts(craftsResponse.results);
            } catch (error) {
                console.log(error);
            }
        }
        loadOptions();
    }, []);

    function onSubmit(filterData){
        console.log(filterData);
    }

    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
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
                          onClick={(e) => {
                            e.preventDefault()
                            console.log('filter cleared')
                          }}
                          className="px-2 py-1"
                        >
                            <p className="text-sm text-primary">Clear all</p>
                        </button>                                
                    </div>    

                    <div className=" px-3 py-10 py-6 space-y-5 text-sm">
                        <div>
                            <label className="block text-gray-600 mb-1">
                            Craft
                            </label>
                            <select  
                            {...register("craft")}           
                            defaultValue=""
                            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 outline-none transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
                            >
                            <option value="" disabled>Select your craft</option>
                            {crafts.map((craft) => (
                                <option key={craft.id} value={craft.id}>{craft.craft_name}</option>
                            ))}
                            </select>
                            {errors.craft && <p className="text-red-500 mt-1">{errors.craft.message}</p>}
                        </div>   

                        {/* Location */}
                        <div>
                        <label className="block text-gray-600 mb-1">
                            Location / area
                        </label>

                        <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <LocationAutocomplete
                            value={field.value}
                            onChange={field.onChange}
                            />
                        )}
                        />

                        {errors.location && (
                            <p className="text-red-500 mt-1">{errors.location.message}</p>
                        )}
                        </div>

                        <button
                            className="w-full text-white bg-primary py-3 rounded-lg"
                        >
                            Apply filters
                        </button>                               
                    </div>
                </div>
            </div>
        </form>                    
    )
}