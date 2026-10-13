import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./Features/Auth/context/AuthContext";
import { ProtectedRoute } from "./Features/Auth/components/protectedRoute";
import { Toaster } from "react-hot-toast";
import AuthFlow from "./Features/Auth/pages/authFlow";
import OtpVerificationPage from "./Features/Auth/pages/otpVerificationPage";
import LoginPage from "./Features/Auth/pages/loginPage";
import ForgotPasswordPage from "./Features/Auth/pages/forgotPasswordPage";
import SetNewPasswordPage from "./Features/Auth/pages/setNewPassword";
import HomePage from "./Features/Home/pages/homePage";
import StorefrontPage from "./Features/Storefront/pages/storefrontPage";
import ItemDetailsPage from "./Features/Storefront/pages/itemDetailsPage";
import SettingsPage from "./Features/Settings/pages/settings";

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

          {/* protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path="home" element={<HomePage />} />
            <Route path="storefront/:slug" element={<StorefrontPage />} />
            <Route path="storefront/:slug/items/:itemSlug" element={<ItemDetailsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
                                                                     
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
