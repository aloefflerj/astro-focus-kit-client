import { api } from '../api';

const resource = '/sites/config';

export const useSitesApi = () => ({
    getSitesConfig: async () => {
        const response = await api.get(resource);
        return response.data;
    },
    createNewSiteConfig: async (url: string) => {
        const response = await api.post(resource, [{ url: url }]);
        return response.data;
    },
});
