import { api } from "../api";

const resource = '/sites/config';

export const useSitesApi = () => ({
    getSitesConfig: async () => {
        const response = await api.get(resource);
        return response.data;
    },
}); 