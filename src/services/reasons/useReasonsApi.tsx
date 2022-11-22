import { IReason } from '../../common/types';
import { api } from '../api';

const resource = '/sites/config';

export const useReasonsApi = () => ({
    answerNewReason: async (reason: IReason) => {
        const response = await api.post(resource, reason);
        return response.data;
    },
});
