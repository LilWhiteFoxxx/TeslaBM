import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Import the jwt-decode library

// Helper function to get user and token from localStorage
const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const getAccessTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
};

// Function to check if token is expired
const isTokenExpired = (token) => {
    if (!token) return true; // Token is missing or invalid
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime; // Check if token expiration is in the past
    } catch (error) {
        console.error('Error decoding token', error);
        return true; // Treat errors as expired
    }
};

const initialState = {
    user: getUserFromLocalStorage(),
    accessToken: getAccessTokenFromLocalStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('user', JSON.stringify(state.user));
            // localStorage.setItem('accessToken', state.accessToken);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        },
        updateInfo: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        checkTokenExpiration: (state) => {
            if (state.accessToken && isTokenExpired(state.accessToken)) {
                state.user = null;
                state.accessToken = null;
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
            }
        },
    },
});

export const { login, logout, updateInfo, checkTokenExpiration } =
    authSlice.actions;

export default authSlice.reducer;
