import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_DOMAIN
 
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error.response.data;
    }
);

export const axiosBaseQuery = () => async ({ url, method, data, params, headers }) => {
    try {
        const result = await instance({
            url: BASE_URL + url,
            method,
            data,
            params,
            headers,
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError;
        const error = {
            status: err.response?.status,
            data: err.response?.data || err.message,
        };
        console.log("error:", error);
        return {
            error: error,
        };
    }
};
