import axios from "axios";
import { getUserLocalStorage } from "../contexts/AuthProvider/utils";
import { EnvironmentConfig } from "../config/environmentConfig";

export const loginApi = axios.create({
    baseURL: "https://reqres.in/api/"
});

export const api = axios.create({
    baseURL: EnvironmentConfig.mainServerApiBasePath
});

loginApi.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        if (config.headers === undefined) return;

        config.headers['Authorization'] = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        if (config.headers === undefined) return;

        config.headers['Authorization'] = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);