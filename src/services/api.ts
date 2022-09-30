import axios from "axios";
import { getUserLocalStorage } from "../contexts/AuthProvider/utils";

export const api = axios.create({
    baseURL: "https://reqres.in/api/"
});

api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();
        console.log(user);

        if (config.headers === undefined) return;

        config.headers['Authorization'] = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)