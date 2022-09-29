import axios from "axios";
import { EnvironmentConfig } from "../config/environmentConfig";

const api = axios.create({
    baseURL: EnvironmentConfig.mainServerApiBasePath
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        // return {
        //     user: {
        //         id: '1sdf23sd1f',
        //         name: 'sdfsdf',
        //         mail: 'sdf@sdf.adsf'
        //     }
        // }
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        };
        const response = await api.get('/users/1');
        // const response = await api.post('/users', { token });
        return response.data;
    },
    signin: async (email: string, password: string) => {
        const response = await api.get('/users/1');
        return {
            user: response.data,
            token: '123456789'
        };
        // const response = await api.post('/signin', { email, password });
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
})