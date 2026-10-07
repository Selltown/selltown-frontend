import { Wrench, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { loginSchema } from "../schemas/authSchemas"
import { formatPhone } from "../utils/utils"
import { useAuth } from "../context/AuthContext"
import { getFriendlyErrorMessage } from "../../../utils/getFriendlyErrorMessage"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState:{errors, isSubmitting} } = useForm({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(data){
        const finalData = {
            ...data,
            phone_number: formatPhone(data.phone_number)
        }

        try {
            await login({phone_number: finalData.phone_number, password: finalData.password})
            // navigate("/home");
            console.log("Login Successful, Navigating to home...")
        } catch (error) {
            setError(getFriendlyErrorMessage(error));
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center px-8 py-12">
            <div className="w-full max-w-sm space-y-8 text-sm">
                
                {/* logo */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center bg-[#1d9e75] w-12 h-12 rounded-lg mb-3">
                        <Wrench className="text-white" />
                    </div>
                    <h1 className="font-semibold text-lg">Welcome back</h1>
                    <p>Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
                    {error && <p className='text-sm text-red-500 mb-2'>{error}</p>}
                    <div className="flex flex-col space-y-2">
                        <label className="text-gray-600">Phone number</label>
                        <input 
                        type="tel"
                        className="border border-gray-300 p-2 rounded-lg placeholder-gray-300 h-10 transition focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/20"
                        placeholder="0240000000"
                        maxLength={10}
                        {...register("phone_number")}
                        />
                        {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>
                            Password
                        </label>
                        <div className="relative">
                            <input 
                            type={showPassword ? "text" : "password"}
                            className="border border-gray-300 h-10 transition focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary p-2 rounded-lg w-full"
                            {...register("password")}
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword((v) => (!v))}
                            className="absolute right-3 top-1/2- translate-y-1/2 text-gray-300"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20}/>}
                            </button>                            
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgotpassword" className="text-[#1d9e75] font-bold">
                            Forgot Password?
                        </Link>                        
                    </div>


                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1d9e75] text-white w-full h-11 rounded-lg font-bold transition disabled-opacity-60 disabled:bg-gray-200"
                    >
                       {isSubmitting ? "Signing In...": "Sign in"}
                    </button>
                </form>

                <p className="text-center">
                    Don't have an account?
                    <Link to="/register" className="text-[#1d9e75] font-bold"> Register</Link>
                </p>
            </div>
        </div>
    )
}