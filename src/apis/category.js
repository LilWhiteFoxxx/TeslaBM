import axios from '../axios/axios.config';

export const getAllCategory = async (limit = 50, offset = 0) => {
    try {
        const response = await axios.get(`/categories?limit=${limit}&offset=${offset}`);

        return response;
    } catch (error) {
        console.error('get All category error:', error.response?.data || error.message);
        throw error; 
    }
}