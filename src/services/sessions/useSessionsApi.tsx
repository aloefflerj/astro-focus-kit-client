import { AxiosResponse } from 'axios';
import { api } from '../api';

const resource = '/sessions';

export const useSessionsApi = () => ({
    changeStatusToProcrastinating: async (): Promise<AxiosResponse> => {
        const response = await api.patch(resource, { status: 'procrastinating'});
        return response;
    },
    changeStatusToFocusing: async (): Promise<AxiosResponse> => {
        const response = await api.patch(resource, { status: 'focusing'});
        return response;
    },
});
