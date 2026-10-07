import { useState } from "react"
import RegisterPage from "./registerPage"
import ArtisanDetailsPage from "./artisanDetailsPage";
// import LoginPage from "./loginPage";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { formatPhone } from "../utils/utils"; 
import toast from 'react-hot-toast'
import { getFriendlyErrorMessage } from "../../../utils/getFriendlyErrorMessage";

export default function AuthFlow() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        password: "",
        role: "",
    })

    const navigate = useNavigate();
    const { register } = useAuth()

    function updateFormData(fields){
        setFormData((prev) => ({...prev, ...fields}))
    }

    function handleRegisterScreen(RegisterScreenData) {
        updateFormData(RegisterScreenData)
        
        if(RegisterScreenData.role === "artisan"){
            setStep(2);
        } else {
            submitRegisteration(RegisterScreenData);         
        }
    }

    function handleArtisanDetailsScreen(ArtisanDetailsScreenData) {
        const completeData = {...formData, ...ArtisanDetailsScreenData}
        updateFormData(ArtisanDetailsScreenData);
        submitRegisteration(completeData);
    }

    // Actual data submission to DB
    async function submitRegisteration(data){
        setIsSubmitting(true)
        const finalData = {
            ...data,
            phone_number: formatPhone(data.phone_number)
        }

        try {   
            console.log("Final Data", finalData);
            const response = await register(finalData);
            toast.success(response.detail || 'Otp has been sent to your phone')
            navigate("/verify-otp", {
                state: {
                    phone_number: finalData.phone_number,
                    purpose: "register",
                    ussdCode: response.ussd_code
                }
            })
        } catch (error) {
            console.log(error.response?.data?.phone_number);
            console.log(error.message);
            setError(getFriendlyErrorMessage(error));
        }finally {
            setIsSubmitting(false);
        }
    }
    
    return(
        <>
        {step === 1 && (
            <RegisterPage 
            onComplete={handleRegisterScreen} 
            isSubmitting={isSubmitting}
            error={error} 
            />
        )}
        {step === 2 && (
            <ArtisanDetailsPage 
            onComplete={handleArtisanDetailsScreen} 
            onBack={() => setStep(1)}
            isSubmitting={isSubmitting}
            error={error}
            />
        )}
        {/* {step === 3 && (
            <LoginPage />
        )}  */}
        </>
    )
}


