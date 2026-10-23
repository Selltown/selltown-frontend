import { ShoppingBag, ArrowLeft, ImagePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { checkStorefrontName, createStorefront } from "../services/homeService";
import { useAuth } from "../../Auth/context/AuthContext";
import toast from "react-hot-toast";

export default function CreateStorefrontModal({setShowCreateModal, onStorefrontCreated}) {
    const { setUser } = useAuth();
    const [name, setName] = useState("")
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [nameStatus, setNameStatus] = useState("idle")
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");;

    const slug = name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    // Tidy-up: release the temporary URL when it's replaced or the modal closes
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    useEffect(() => {
        if (name.trim().length < 3) {
            setNameStatus("idle");
            return;
        }

        setNameStatus("checking");
        let cancelled = false;

        const timer = setTimeout(async () => {
            try {
                const available = await checkStorefrontName(name.trim());
                if (!cancelled) setNameStatus(available ? "available" : "taken");
            } catch (err) {
                if (!cancelled) setNameStatus("error");
            }
        }, 400);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [name]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const storefront = await createStorefront({ name: name.trim(), image });
            setUser((prev) => ({
                ...prev,
                storefront_id: storefront.id,
                storefront_name: storefront.name
            }))
            onStorefrontCreated?.();
            setShowCreateModal(false);
            toast.success("Storefront created Successfully");
        } catch (err) {
            setError(
                Array.isArray(err?.name)
                    ? err.name[0]
                    : "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div 
        onClick={() => setShowCreateModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
            <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                        <button
                         onClick={() => setShowCreateModal(false)}
                         aria-label="Close">
                        <ArrowLeft size={18} className="text-neutral-600" />
                        </button>
                        <span className="text-md font-medium">Create Storefront</span>
                    </div>
                </div>                

                <div className="max-h-[75vh] overflow-y-auto">
                    <div className="px-4 py-8">

                        <div className="">
                            {/* Image */}
                            <div className="flex justify-center mb-2">
                                <label htmlFor="storefrontImage" className="relative cursor-pointer">
                                    <div className="w-24 h-24 rounded-lg bg-primary-light flex items-center justify-center overflow-hidden">
                                        {preview ? (
                                            <img src={preview} alt="Storefront preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag className="text-primary" size={25} />
                                        )}
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-gray-300 bg-white">
                                        <ImagePlus size={14} className="text-gray-600" />
                                    </span>
                                </label>
                                <input
                                    id="storefrontImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-center text-xs text-gray-400 mb-6">Add a storefront image (optional)</p>

                            <h1 className="text-center font-bold text-lg mb-1">Set up your storefront</h1>
                            <p className="text-center text-sm text-gray-500 mb-8">
                                Choose the name customers will see and use to find you.
                            </p>                            
                        </div>


                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            {/* Name */}
                            <div>
                                <label htmlFor="storefrontName" className="block text-sm text-gray-600 mb-1">
                                    Storefront name
                                </label>
                                <input
                                    id="storefrontName"
                                    type="text"
                                    placeholder="e.g. Ama's Batik Studio"
                                    className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 outline-none transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {nameStatus === "checking" && (
                                    <p className="text-xs text-gray-400 mt-1">Checking availability...</p>
                                )}
                                {nameStatus === "available" && (
                                    <p className="text-xs text-green-600 mt-1">This name is available</p>
                                )}
                                {nameStatus === "taken" && (
                                    <p className="text-xs text-red-500 mt-1">This name is already taken</p>
                                )}
                                {nameStatus === "error" && (
                                    <p className="text-xs text-gray-400 mt-1">Couldn't check right now</p>
                                )}
                            </div>

                            {/* Public link preview */}
                            <div className="bg-gray-100 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Your public link</p>
                                <p className="text-sm text-primary break-all">
                                    selltown.gh/{slug || "your-storefront-name"}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={!name.trim() || nameStatus === "checking" || nameStatus === "taken" || submitting}
                                className="w-full text-white bg-primary py-3 rounded-lg disabled:opacity-50"
                            >
                                {submitting ? "Creating..." : "Create storefront"}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            You can change the storefront name later in your settings.
                        </p>                        
                    </div>

                </div>
            </div>            
        </div>

    );
}