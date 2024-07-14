import axios from '../axios/axios.config';

export const getAllMotor = async (limit = 50, offset = 0) => {
    try {
        const response = await axios.get(`/motors?limit=${limit}&offset=${offset}`);

        return response;
    } catch (error) {
        console.error('get All motor error:', error.response?.data || error.message);
        throw error; 
    }
}