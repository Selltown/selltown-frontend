import { useEffect, useRef, useState } from "react";
import { searchLocations } from "../services/locationService";


export default function LocationAutocomplete({ value, onChange }) {
    const [query, setQuery] = useState(value?.formatted || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if(!query.trim() || selectedLocation){
            setSuggestions([]);
            return;
        }

        const timeout = setTimeout(async () => {
            try {

                setIsLoading(true);
                setHasSearched(false);
                setSearchError(false);

                const results = await searchLocations(query);
                setSuggestions(results);
                setHasSearched(true);

            } catch (error) {

                console.error(error);
                setSuggestions([]);
                setHasSearched(false);
                setSearchError(true);

            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => clearTimeout(timeout)
        
    }, [query, selectedLocation]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                autocompleteRef.current &&
                !autocompleteRef.current.contains(event.target)
            ) {
                setSuggestions([]);
                setHasSearched(false);
                setSearchError(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    function handleSelect(location){

        const selected = {
            full_address: location.formatted,
            name: location.name,
            city: location.city,
            region: location.state,
            place_id: location.place_id,
            latitude: location.lat,
            longitude: location.lon,            
        };

        setQuery(location.formatted);
        setSelectedLocation(selected);
        setSuggestions([]);
        setHasSearched(false);
        setSearchError(false);
        onChange(selected);
    }


    return(
        <div ref={autocompleteRef} className="relative">
        <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setSelectedLocation(null);
            }}
            placeholder="e.g. Makola"
            className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
        />

        {isLoading && (
            <p className="absolute left-0 right-0 mt-1 px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg">
            Searching...
            </p>
        )}

        {hasSearched && !isLoading && suggestions.length === 0 && (
            <div className="absolute z-10 left-0 right-0 mt-1 px-3 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-700">
                    We couldn't find that location.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Try a nearby town, area, or landmark.
                </p>
            </div>
        )}

        {searchError && !isLoading  && (
            <div className="absolute z-10 left-0 right-0 mt-1 px-3 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-700">
                    Location search is unavailable right now.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Please check your connection and try again.
                </p>
            </div>
        )}

        {suggestions.length > 0 && !isLoading && (
            <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {suggestions.map((location) => (
                <button
                key={location.place_id}
                type="button"
                onClick={() => handleSelect(location)}
                className="w-full text-left px-3 py-3 text-sm hover:bg-gray-50 transition"
                >
                <p className="font-medium text-gray-900">
                    {location.name || location.city}
                </p>

                <p className="text-gray-500 mt-0.5">
                    {location.formatted}
                </p>
                </button>
            ))}
            </div>
        )}
        </div>
    )
}