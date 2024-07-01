import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 80000;

instance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        const responseObject = {
            data: response?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    async function (error) {
        const responseObject = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "Something went wrong!!!",
            errorMessages: error?.response?.data?.message,
        };

        return responseObject;
    }
);

export { instance };