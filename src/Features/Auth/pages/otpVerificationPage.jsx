import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, MessageSquareCheck, CircleAlert, Clock } from "lucide-react";
import { resendOTP, verifyPasswordReset } from "../services/authService";
import { formatTime, handleKeyDown, handlePaste, handleDigitChange } from "../utils/utils"
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast'
import { getFriendlyErrorMessage } from "../../../utils/getFriendlyErrorMessage";

const OTP_LENGTH = 6
const OTP_EXPIRY_SECONDS = 2 * 60 // 2 minutes

export default function OtpVerificationPage() {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()

  // Pull state passed from the previous screen
  const { phone_number = "", purpose = "", ussdCode = "" } = location.state || {}

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef([])
  const STORAGE_KEY = `otp_expiry_${phone_number}`
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const remaining = Math.ceil((Number(saved) - Date.now()) / 1000)
      return remaining > 0 ? remaining : 0
    }

    const expiry = Date.now() + OTP_EXPIRY_SECONDS * 1000
    sessionStorage.setItem(STORAGE_KEY, String(expiry))
    return OTP_EXPIRY_SECONDS  
  })

  useEffect(() => {
    if (secondsLeft <= 0) return

    const interval = setInterval(() => {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (!saved) return
      const remaining = Math.ceil((Number(saved) - Date.now()) / 1000)
      setSecondsLeft(remaining > 0 ? remaining : 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsLeft])


  // Focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [secondsLeft])

  // Build the OTP string from digits array
  const otpValue = digits.join("")
  const isComplete = otpValue.length === OTP_LENGTH


  async function submitOtp(code) {
    setIsVerifying(true)
    setError("")

    try {
      // Navigate based on why the user is here
      if (purpose === "reset-password") {

        const response = await verifyPasswordReset({phone_number, code: code})
        navigate("/set-new-password", { state: { phone_number, token: response.token }})

      } 
      else {

        await verifyOTP({ phone_number, code: code})
        toast.success("You've been verified successfully!");
        sessionStorage.removeItem(STORAGE_KEY);
        console.log("User Verified Successfully!")
        // navigate("/home");

      }
    } catch (error) {
      console.log(error.response?.data?.detail);
      console.log(error.message);
      setError(getFriendlyErrorMessage(error));
      // Clear boxes and refocus first input
      setDigits(Array(OTP_LENGTH).fill(""))
      inputRefs.current[0]?.focus()

    } finally {
      setIsVerifying(false)
    }
  }

  async function handleResend(phone) {
    setIsResending(true)
    setError("")

    try {

      const response = await resendOTP({phone_number: phone});
      if(response) toast.success('OTP has been resent to you');
      const expiry = Date.now() + OTP_EXPIRY_SECONDS * 1000
      sessionStorage.setItem(STORAGE_KEY, String(expiry))
      setDigits(Array(OTP_LENGTH).fill(""))
      setSecondsLeft(OTP_EXPIRY_SECONDS)
      inputRefs.current[0]?.focus()      
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.log(error.response?.data?.detail)
      console.log(error.message);
      setError(getFriendlyErrorMessage(error));

    } finally {
      setIsResending(false)
    }
  }

  const timerExpired = secondsLeft <= 0

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Back */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:border-gray-400 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Icon + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1D9E75] mb-4">
            <MessageSquareCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Enter your code</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-900">{phone_number.replace(/^\+233/, "0") || "your number"}</span>.
            It expires in 2 minutes.
          </p>
        </div>

        {/* OTP boxes */}
        <div className="flex gap-2 justify-center mb-4" onPaste={(e) => handlePaste(e, {OTP_LENGTH, setDigits, setError, inputRefs, submitOtp})}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value, {digits, setDigits, setError, OTP_LENGTH, inputRefs, submitOtp})}
              onKeyDown={(e) => handleKeyDown(index, e, digits, inputRefs)}
              className={`w-11 h-14 text-center text-xl font-semibold rounded-lg border outline-none transition
                focus:ring-2 focus:ring-[#1D9E75]/20 focus:border-[#1D9E75]
                ${digit
                  ? "border-[#1D9E75] bg-[#E1F5EE] text-[#0F6E56]"
                  : "border-gray-300 bg-white text-gray-900"
                }
                ${error ? "border-red-400 bg-red-50" : ""}`}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-3">{error}</p>
        )}

        {/* Timer */}
        <div className="flex justify-center mb-4">
          {timerExpired ? (
            <span className="text-xs text-red-500 font-medium">Code expired</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              <Clock size={20}/>
              {formatTime(secondsLeft)} remaining
            </span>
          )}
        </div>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mb-5">
          Didn't receive it?{" "}
          {timerExpired ? (
            <button
              type="button"
              onClick={() => handleResend(phone_number)}
              disabled={isResending}
              className="text-[#1D9E75] font-medium hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending…" : "Resend code"}
            </button>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              Resend code
            </span>
          )}
        </p>

        {/* Hint */}
        <div className="flex items-start gap-2.5 bg-[#E1F5EE] rounded-lg px-3 py-2.5 mb-5">
          <CircleAlert className="text-[#0F6E56]" size={20}/>
          <p className="text-xs text-[#0F6E56] leading-relaxed">
            Check your SMS inbox. Your code should arrive within a few seconds. If you don't receive it,{` you can dial ${ussdCode} to retrieve your OTP`}
          </p>
        </div>

        {/* Verify button — only shown if auto-submit hasn't fired (e.g. user typed slowly) */}
        <button
          type="button"
          onClick={() => submitOtp(otpValue)}
          disabled={!isComplete || isVerifying || timerExpired}
          className="w-full h-11 rounded-lg bg-[#1D9E75] hover:bg-[#189065] text-white text-sm font-semibold transition disabled:opacity-40"
        >
          {isVerifying ? "Verifying…" : "Verify code"}
        </button>

      </div>
    </div>
  )
}