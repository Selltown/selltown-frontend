export function formatPhone(phoneNumber){
        return "+233" + phoneNumber.slice(1)
    }

export function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0")
    const s = String(seconds % 60).padStart(2, "0")
    return `${m}:${s}`
  }

export function handleKeyDown(index, e, digits, inputRefs) {
    // On backspace with empty box, move focus to previous box
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

export function handlePaste(e , { OTP_LENGTH, setDigits, setError, inputRefs, submitOtp }) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!pasted) return

    const updated = Array(OTP_LENGTH).fill("")
    pasted.split("").forEach((char, i) => {
      updated[i] = char
    })
    setDigits(updated)
    setError("")

    // Focus the box after the last pasted digit
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputRefs.current[nextIndex]?.focus()

    if (pasted.length === OTP_LENGTH) {
      submitOtp(pasted)
    }
  }


export function handleDigitChange(index, value, {digits, setDigits, setError, OTP_LENGTH, inputRefs, submitOtp}) {
      // Only accept a single digit
      const digit = value.replace(/\D/g, "").slice(-1)
  
      const updated = [...digits]
      updated[index] = digit
      setDigits(updated)
      setError("")
  
      // Auto-focus next box
      if (digit && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus()
      }
  
      // Auto-submit when last digit is entered
      if (digit && index === OTP_LENGTH - 1) {
        const completeOtp = updated.join("")
        if (completeOtp.length === OTP_LENGTH) {
          submitOtp(completeOtp)
        }
      }
    }
    