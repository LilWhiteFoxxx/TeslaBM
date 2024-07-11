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
        updateInfo: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const { login, logout, updateInfo } = authSlice.actions;

export default authSlice.reducer;
