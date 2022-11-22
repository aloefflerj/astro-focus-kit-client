import { AxiosResponse } from 'axios';
import { IReason } from '../../common/types';
import { api } from '../api';

const resource = '/reasons';

export const useReasonsApi = () => ({
    answerNewReason: async (reason: IReason): Promise<AxiosResponse> => {
        const response = await api.post(resource, reason);
        return response;
    },
});
