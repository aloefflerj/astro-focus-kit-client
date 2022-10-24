import axios from "axios";
import { getUserLocalStorage } from "../contexts/AuthProvider/utils";
import { EnvironmentConfig } from "../config/environmentConfig";

export const api = axios.create({
    baseURL: EnvironmentConfig.mainServerApiBasePath
});

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        if (config.headers === undefined) return;

        config.headers['x-access-token'] = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//TODO: refresh x-access-token jwt token