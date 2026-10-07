import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./Features/Auth/context/AuthContext";
import { Toaster } from "react-hot-toast";
import AuthFlow from "./Features/Auth/pages/authFlow";
import OtpVerificationPage from "./Features/Auth/pages/otpVerificationPage";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace/>}/>
          <Route path="register" element={<AuthFlow />} /> 
          <Route path="verify-otp" element={<OtpVerificationPage />} />                             
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
