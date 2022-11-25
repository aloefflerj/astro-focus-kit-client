import { AxiosResponse } from 'axios';
import { IReason } from '../../common/types';
import { api } from '../api';

const resource = '/reasons';

export const useReasonsApi = () => ({
    getReasons: async () => {
        const response = await api.get(resource);
        return response.data;
    },
    answerNewReason: async (reason: IReason): Promise<AxiosResponse> => {
        const response = await api.post(resource, reason);
        return response;
    },
});
