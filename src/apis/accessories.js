import axios from '../axios/axios.config';

export const getAllAccessories = async (limit = 50, offset = 0) => {
    try {
        const response = await axios.get(`/accessories?limit=${limit}&offset=${offset}`);

        return response;
    } catch (error) {
        console.error('get All accessories error:', error.response?.data || error.message);
        throw error; 
    }
}