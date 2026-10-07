import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { artisanDetailsSchema } from "../schemas/authSchemas"
import { fetchCrafts } from "../services/authService"
import LocationAutocomplete  from "../../../components/LocationAutocomplete"

export default function ArtisanDetailsAuthPage({ onComplete, onBack, isSubmitting, error }) {
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const craftResponse = await fetchCrafts();
        setCrafts(craftResponse)
      } catch (error) {
        console.log(error)
      }            
    }
    loadOptions();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(artisanDetailsSchema),
    defaultValues: {
      craft: "",
      location: null,
    },
  })

  function onSubmit(data) {
    onComplete(data)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:border-gray-400 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your craft</h2>
            <p className="text-gray-500">A few more details about your work</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-1.5 mb-8">
          <div className="h-1 flex-1 rounded-full bg-[#1D9E75]" />
          <div className="h-1 flex-1 rounded-full bg-[#1D9E75]" />
          <div className="h-1 flex-1 rounded-full bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}
          {/* Craft */}
          <div>
            <label className="block text-gray-600 mb-1">
              Craft type
            </label>
            <select
              {...register("craft")}             
              defaultValue=""
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-gray-900 bg-white outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
            >
              <option value="" disabled>Select your craft</option>
              {crafts.map((craft) => (
                <option key={craft.id} value={craft.id}>{craft.craft_name}</option>
              ))}
            </select>

            {errors.craft && (
              <p className="text-red-500 mt-1">{errors.craft.message}</p>
            )}            
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white  font-semibold transition disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Please wait…" : "Complete registration"}
          </button>

        </form>

      </div>
    </div>
  )
}