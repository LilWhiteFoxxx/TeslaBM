import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
});

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
        return response.data;
    },
    function (error) {
        return error.response.data;
    }
);

// axiosRetry(instance, { retries: 3, retryCondition: () => true });


export default instance;
