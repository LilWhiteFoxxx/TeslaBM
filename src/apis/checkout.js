import axios from '../axios/axios.config';

export const checkCartItem = async (payload) => {
    try {
        const response = await axios.post(`/checkout/${payload.id}`);

        return response;
    } catch (error) {
        console.error('Check cart item error:', error.response?.data || error.message);
        throw error;
    }
};

export const checkout = async () => {
    try {

        const response = await axios.post(`/checkout`);

        return response;
    } catch (error) {
        console.error('Checkout error', error.response?.data || error.message);
        throw error;
    }
};

