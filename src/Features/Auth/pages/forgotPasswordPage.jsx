import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, LockOpen } from "lucide-react"
import { useNavigate, Link } from "react-router"
import { forgotPasswordSchema } from "../schemas/authSchemas"
import { requestPasswordReset } from "../services/authService"
import toast from "react-hot-toast"
import { getFriendlyErrorMessage } from "../../../utils/getFriendlyErrorMessage"

export default function ForgotPasswordPage() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phone_number: "" },
  })

  async function onSubmit(data) {
    const phoneNumber = {
      phone_number: "+233" + data.phone_number.slice(1),
    }

    try {

      const response = await requestPasswordReset(phoneNumber);
      toast.success("Verification code has been sent")
      navigate("/verify-otp", {
        state: {
          phone_number: data.phone_number,
          purpose: "reset-password",
          ussdCode: response.ussd_code
        },
      })

    } catch (error) {
      console.log(error.response?.data?.detail)
      console.log(error.message)
      toast.error(getFriendlyErrorMessage(error));
      
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12">
      <div className="w-full max-w-sm">

        {/* Back */}
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:border-gray-400 transition"
            aria-label="Back to login"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </Link>
        </div>

        {/* Icon + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1D9E75] mb-4">
            <LockOpen className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Forgot password?</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Enter the phone number linked to your account. We'll send a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone number
            </label>
            <input
              {...register("phone_number")}
              type="tel"
              placeholder="0244000000"
              maxLength={10}
              className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white text-sm font-semibold transition disabled:opacity-60"
          >
            {isSubmitting ? "Sending code…" : "Send code"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered it?{" "}
          <Link to="/login" className="text-[#1D9E75] font-bold hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}