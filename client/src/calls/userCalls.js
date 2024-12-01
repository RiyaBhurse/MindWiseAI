const { axiosInstance } = require('./index');

axiosInstance.defaults.withCredentials = true;

// Register a new user
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/register', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Login a user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/login', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// get current user from frontend
export const GetCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-current-user');
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Update User Profile
export const UpdateUserProfile = async (value) => {
    try {
        const response = await axiosInstance.put('/api/users/update-profile', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

// Forget and Reset Password
export const ForgetPassword = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/forget-password', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}

export const ResetPassword = async (value) => {
    try {
        const response = await axiosInstance.post('/api/users/reset-password', value);
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}
