import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { setPasswordSchema } from "../schemas/authSchemas"
import { useNavigate, useLocation } from "react-router"
import { confirmPasswordReset } from "../services/authService"
import toast from "react-hot-toast"
import { getFriendlyErrorMessage } from "../../../utils/getFriendlyErrorMessage"


export default function SetNewPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { phone_number = "", token = "" } = location.state || {}

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data) {
    try {
      const response = await confirmPasswordReset({phone_number, token, password: data.password});
      toast.success(response.detail || "Password updated successfully");
      navigate("/login", {
        state: {
          message: "Password updated. Sign in with your new password"
        }
      })
      
    } catch (error) {
      console.log(error.response?.data?.detail)
      console.log(error.message)
      toast.error(getFriendlyErrorMessage(error));
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Icon + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1D9E75] mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Set new password</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Choose a strong password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* New password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                className="w-full h-11 px-3 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary
                  focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                className="w-full h-11 px-3 pr-10 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 outline-none transition
                focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white text-sm font-semibold transition disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Saving…" : "Save new password"}
          </button>

        </form>

      </div>
    </div>
  )
}