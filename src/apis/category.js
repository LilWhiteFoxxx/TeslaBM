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

export const getAllCategoryOfAccessories = async (limit = 50, offset = 0) => {
    try {
        const response = await axios.get(`/categories/accessories?limit=${limit}&offset=${offset}`);

        const seenNames = new Set();

        const filteredCategories = response.metadata.filter(category => {
            if (seenNames.has(category.name)) {
                return false;
            } else {
                seenNames.add(category.name);
                return true;
            }
        });

        return {
            ...response,
            metadata: filteredCategories
        };
    } catch (error) {
        console.error('get All category error:', error.response?.data || error.message);
        throw error; 
    }
};