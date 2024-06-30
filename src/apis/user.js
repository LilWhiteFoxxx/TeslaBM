import axios from '../configs/axios.config';

// Define the sign-in function
export const signIn = async (email, password) => {
    try {
        const response = await axios.post('/login', {
            email,
            password,
        });

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

export const signUp = async (username, email, password) => {
    try {
        const response = await axios.post('/register', {
            username,
            email,
            password,
        });

        return response;
    } catch (error) {
        console.error('Sign-up error:', error.response?.data || error.message);
        throw error; // Propagate the error to be handled by the calling function
    }
};
