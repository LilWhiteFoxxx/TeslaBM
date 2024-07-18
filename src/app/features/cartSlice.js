// features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
    },
    reducers: {
        // addItem: (state, action) => {
        //   state.items.push(action.payload);
        //   state.quantity += action.payload.quantity;
        // },
        addItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
                state.quantity += 1;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.quantity -= 1;
        },
        updateQuantity: (state, action) => {
            state.quantity = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
            state.quantity = 0;
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
    cartSlice.actions;

export const cartQuantity = (state) => state.cart.quantity;

export default cartSlice.reducer;
