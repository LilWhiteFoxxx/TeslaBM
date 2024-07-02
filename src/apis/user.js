import axios from '../axios/axios.config';

// Define the sign-in function
export const signIn = async (payload) => {
    try {
        const body = {
            email: payload.email,
            password: payload.password,
        };
        const response = await axios.post('/login', body);

        if (response.metadata) {
            const { accessToken } = response.metadata;
            localStorage.setItem('accessToken', accessToken);
            console.log('Sign-in successful:', response);
        }

        return response;
    } catch (error) {
        console.error('Sign-in error:', error.response?.data || error.message);
        throw error;
    }
};

export const signUp = async (payload) => {
    try {
        const body = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            firstName: payload.firstName,
            lastName: payload.lastName
        };
        const response = await axios.post('/register', body);

        return response;
    } catch (error) {
        console.error('Sign-up error:', error.response?.data || error.message);
        throw error; // Propagate the error to be handled by the calling function
    }
};

export const forgotPassword = async (payload) => {
    try {
        console.log(payload);
        const body = {
            email: payload
        };
        const response = await axios.post('/forgotpassword', body);

        return response;
    } catch (error) {
        console.error('Forgot password error:', error.response?.data || error.message);
        throw error; // Propagate the error to be handled by the calling function
    }
}
