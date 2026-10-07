import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./Features/Auth/context/AuthContext";
import { Toaster } from "react-hot-toast";
import AuthFlow from "./Features/Auth/pages/authFlow";
import OtpVerificationPage from "./Features/Auth/pages/otpVerificationPage";
import LoginPage from "./Features/Auth/pages/loginPage";
import ForgotPasswordPage from "./Features/Auth/pages/forgotPasswordPage";
import SetNewPasswordPage from "./Features/Auth/pages/setNewPassword";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace/>}/>
          <Route path="register" element={<AuthFlow />} /> 
          <Route path="verify-otp" element={<OtpVerificationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="set-new-password" element={<SetNewPasswordPage />} />                                                           
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
