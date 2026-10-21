import { createContext, useContext, useEffect, useState } from "react"
import { login as loginRequest, register as registerRequest, verifyOTP as verifyOTPRequest, logout as logoutRequest } from "../services/authService";


const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // true until we've checked for an existing session

    // On app load: if we have a saved user + access token, restore the session
    // from localStorage. Your API contract has no "/me" endpoint shown, so we
    // trust the user object we stored at login time rather than re-fetching it. 
    
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user');
        if(accessToken && storedUser) {
            setUser(JSON.parse(storedUser));
        } 
        setLoading(false);
    }, []);


    const login = async (credentials) => {
        const { access, refresh, user: loggedInUser } = await loginRequest(credentials);
        
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return loggedInUser;
    }

    const register = async (formData) => {
        const response = await registerRequest(formData);
        return response;
    }

    const verifyOTP = async(otpData) => {
       const { access, refresh, user: verifiedUser } = await verifyOTPRequest(otpData);
       localStorage.setItem('access_token', access);
       localStorage.setItem('refresh_token', refresh);
       localStorage.setItem('user', JSON.stringify(verifiedUser));
       setUser(verifiedUser);
       return verifiedUser;
    }

    const logout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
            const response = await logoutRequest(refreshToken);
            console.log('logout response', response);

        } catch (error) {
            console.log("Logout blacklist failed", error);
            
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            setUser(null);
        }      
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        verifyOTP,
        logout,
        // setUser, // handy if you need to patch user profile data elsewhere
    }


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}