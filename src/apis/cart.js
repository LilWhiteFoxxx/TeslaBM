import axios from '../axios/axios.config';

export const getCart = async () => {
    try {
        const response = await axios.get(`/cart`);

        return response;
    } catch (error) {
        console.error('get cart error:', error.response?.data || error.message);
        throw error;
    }
};

export const addToCart = async (payload) => {
    try {
        const body = {
            type: payload.type,
            productId: payload.productId,
            quantity: Number(payload.quantity)
        }
        const response = await axios.post(`/cart/addtocart`, body);

        return response;
    } catch (error) {
        console.error('Add to cart error:', error.response?.data || error.message);
        throw error;
    }
};

export const updateCartItem = async (payload) => {
    try {
        const body = {
            type: payload.type,
            productId: payload.productId,
            quantity: Number(payload.quantity)
        }
        const response = await axios.put(`/cart/updatecartitem`, body);

        return response;
    } catch (error) {
        console.error('update cart item error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteCartItem = async (payload) => {
    try {
        // const body = {
        //     id: payload.id
        // }
        const response = await axios.delete(`/cart/deletecartitem/${payload.id}`);

        return response;
    } catch (error) {
        console.error('delete cart item error:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteCart = async () => {
    try {
        const response = await axios.delete(`/cart`);

        return response;
    } catch (error) {
        console.error('delete cart error:', error.response?.data || error.message);
        throw error;
    }
};

