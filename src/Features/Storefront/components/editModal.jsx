import { useState } from "react";
import { updateStorefront } from "../services/storefrontService";
import { X } from "lucide-react";

export default function EditModal({onClose, id, onUpdated }) {
    const [storefrontName, setStorefrontName] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSave() {
        if(!storefrontName.trim()) {
            setError("Please enter a storefront name")
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response =  await updateStorefront(id, storefrontName);
            onUpdated(response);
            onClose();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
  return (
    <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className={`w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl ${loading ? "opacity-60" : "opacity-100"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <p className="text-base font-semibold text-neutral-900">Update Storefront</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto">
          <div className="space-y-5 p-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Storefront name
              </label>
              <input
                type="text"
                disabled={loading}
                placeholder="e.g. Ama's Batik Studio"
                className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20"
                value={storefrontName}
                onChange={(e) => setStorefrontName(e.target.value)}
              />
              {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
            </div>

            <button 
            className="h-11 w-full rounded-lg bg-primary font-medium text-white hover:opacity-90"
            onClick={handleSave}
            disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}