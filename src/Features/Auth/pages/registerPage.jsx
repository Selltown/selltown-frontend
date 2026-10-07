import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Wrench, User } from "lucide-react"
import { Link } from 'react-router'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from '../schemas/authSchemas'



export default function RegisterPage({ onComplete, isSubmitting, error }) {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: {errors} } = useForm({
        resolver : zodResolver(registerSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            password: "",
            role: "",
        }
    })


     async function onSubmit(data) {
         onComplete(data);
        // console.log(data);
    }

    const selectedRole = watch("role")

    function selectRole(role) {
        setValue("role", role, { shouldValidate: true})
    }

    return(
        <div className="min-h-screen flex items-center justify-center px-8 py-12">
            <div className="w-full max-w-sm text-sm">

                {/* logo */}
                <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-3">
                        <Wrench className="text-white" />
                    </div>       
                    <h1 className="text-lg font-bold ">Create account</h1>
                    <p>Join the artisan marketplace</p>             
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-sm">
                    {error && <p className='text-xs text-red-500 mb-2'>{error}</p>}
                    <div className='flex flex-col space-y-2 mb-3'>
                        <label className='text-gray-600'>Full name</label>
                        <input className="border border-gray-300 text-sm p-2 rounded-lg w-full h-10 placeholder-gray-300 transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75] focus:outline-none" placeholder='Manuel De Bronya' maxLength={30} {...register("name")} />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className='flex flex-col space-y-2 mb-3'>
                        <label className='text-gray-600'>Phone number</label>
                        <input className='border border-gray-300 rounded-lg p-2 h-10 transition focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75] placeholder-gray-300' placeholder='024000000' maxLength={10} {...register("phone_number")} />
                        {errors.phone_number && <p className='text-red-500'>{errors.phone_number.message}</p>}
                    </div>

                    <div className='flex flex-col space-y-2 mb-3'>
                        <label className='text-gray-600'>Password</label>
                        <div className='relative'>
                            <input type={showPassword ? "text" : "password"} className='border border-gray-300 rounded-lg p-2 h-10 w-full transition focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-primary focus:outline-none' {...register("password")} 
                            />
                            <button
                            type='button'
                            onClick={() => setShowPassword((v) => (!v))}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-300'
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>                           
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    {/* Role Selector */}
                    <div className='space-y-2 mb-6'>
                        <p>I am a --</p>
                        <div className='grid grid-cols-2 gap-3'>
                            <button
                            type='button'
                            onClick={() => selectRole("customer")}
                            className={`flex items-center justify-center border bg:opacity-0.4 rounded-sm h-11 transition text-gray-500 ${selectedRole === "customer" ? "border-primary bg-[#E1F5EE] text-primary" : "border"}`}
                            >
                                <User size={18}/>
                                Customer
                            </button>

                            <button
                            type='button'
                            onClick={() => selectRole("artisan")}
                            className={`flex items-center justify-center border rounded-sm text-gray-500 ${selectedRole === 'artisan' ? "border-primary text-primary bg-[#E1F5EE]" : "border"}`}
                            >
                                <Wrench size={18}/>
                                Artisan
                            </button>

                            <input type='hidden' {...register("role")} />
                        </div>
                        {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
                    </div> 

                    {/* Submit */}
                    <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full h-11 rounded-lg bg-primary text-white hover:bg-[#189065] mb-4 font-semibold transition  disabled:opacity-40 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? "Please wait..." : "Continue"}
                    </button>   
                </form>

                <p className='text-center'>
                    Already have an account? {" "}
                    <Link className='text-[#1D9E75] font-bold' to="/login">Sign in</Link>
                </p>

            </div>
        </div>
    )
}