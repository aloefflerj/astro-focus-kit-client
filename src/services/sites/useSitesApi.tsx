import { ISite } from '../../elements/Settings/SettingsBlock';
import { api } from '../api';

const resource = '/sites';

export const useSitesApi = () => ({
    getSitesConfig: async () => {
        const response = await api.get(resource);
        return response.data;
    },
    getSiteConfig: async (id: string) => {
        const response = await api.get(`${resource}/${id}`);
        return response.data;
    },
    createNewSiteConfig: async (url: string) => {
        const response = await api.post(resource, [{ url: url }]);
        return response.data;
    },
    removeSiteConfig: async (site: ISite) => {
        await api.delete(`${resource}/${site.id}`);
    },
});
