import axios from '../axios/axios.config';

export const createOrder = async (payload) => {
    try {
        const body = {
            cartItems: payload.cartItems,
            paymentMethodId: payload.paymentMethodId
        }
        const response = await axios.post(`/order/createorder`, body);

        return response;
    } catch (error) {
        console.error('Create order error:', error.response?.data || error.message);
        throw error;
    }
};

export const getOrderById = async (payload) => {
    try {
        const response = await axios.get(`/order/${payload.id}`);

        return response;
    } catch (error) {
        console.error('Get order by id error:', error.response?.data || error.message);
        throw error;
    }
};

export const getOrdersByUserId = async () => {
    try {

        const response = await axios.get(`/order`);

        return response;
    } catch (error) {
        console.error('get order by userId error:', error.response?.data || error.message);
        throw error;
    }
};



