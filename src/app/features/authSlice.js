import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    // accessToken: localStorage.getItem('accessToken') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            // state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.user = null;
            // state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
