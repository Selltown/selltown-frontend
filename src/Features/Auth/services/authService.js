import api from "../utils/axios";

// Register new user
export const register = async (userData) => {
        const data = await api.post('/users/register/', userData)
        return data;
};

export const login = async (userData) => {
    const data = await api.post('/users/login/', userData)
    return data;        
};

export const verifyOTP = async (userData) => {
    const data = await api.post('/users/verify-otp/', userData);
    return data;
};

export const resendOTP = async (phone) => {
        const data = await api.post('/users/resend-otp/', phone);
        return data;        
}

export const requestPasswordReset = async (phone) => {
    const data = await api.post('/users/password-reset/request/', phone);
    return data;
}

export const verifyPasswordReset = async (userData) => {
    const data = await api.post('/users/password-reset/verify/', userData);
    return data;
}

export const confirmPasswordReset = async (userData) => {
    const data = await api.post('/users/password-reset/confirm/', userData);
    return data;
}

export const fetchCrafts = async () => {
    const data = await api.get('/craft/all/');
    return data;
}


// export const changePassword = async (userData) => {
//     const data = await api.post('/users/change-password/', userData)
//     return data;
// };

// export const logout = async (refreshToken) => {
//     const data = await api.post('/users/logout/', {refresh_token: refreshToken});
//     return data;
// }