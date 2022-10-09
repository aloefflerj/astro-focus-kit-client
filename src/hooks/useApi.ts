import { api } from "../services/api";

// const api = axios.create({
//     baseURL: EnvironmentConfig.mainServerApiBasePath
// });

// export const useApi = () => ({
//     validateToken: async (token: string) => {
//         const response = await api.get('/users/1');
//         return response.data;
//     },
//     signin: async (email: string, password: string) => {
//         const response = await api.get('/users/1');
//         return {
//             user: response.data,
//             token: '123456789'
//         };
//         // const response = await api.post('/signin', { email, password });
//         return response.data;
//     },
//     logout: async () => {
//         // return { status: true };
//         const response = await api.post('/logout');
//         return response.data;
//     }
// })