import axiosBase from "axios";

const axios = (params, isFormData) => axiosBase.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,    //eslint-disable-line
    headers: { "Content-Type": isFormData ? "multipart/form-data" : "application/json" },
    timeout: 3000 * 3000,
    ...params && {
        params: { ...params },
    },
});

axios.interceptors?.request?.use(
    (config) => {
        console.log( // eslint-disable-line
            "Request:",
            config,
        );

        return config;
    },
    (error) => {
        console.error( // eslint-disable-line
            "Request Error:",
            error,
        );

        return Promise.reject(error);
    },
);

axios.interceptors?.response?.use(
    (response) => {
        console.log( // eslint-disable-line
            "Response:",
            response,
        );

        return response;
    },
    (error) => {
        if (error.response?.status === 401) console.error("Unauthorized, redirecting..."); // eslint-disable-line

        return Promise.reject(error);
    },
);

export default axios;
