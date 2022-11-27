import { AxiosResponse } from "axios";
import { ITimer } from "../../common/types";
import { api } from "../api"

const resources = '/timers'

export const useTimersApi = () => ({
    getTimer: async (): Promise<AxiosResponse<ITimer>> => {
        return await api.get(resources);
    },
    updateTimer: async (timerId: string, time: number): Promise<AxiosResponse> => {
        return await api.patch(`${resources}/${timerId}`, { time });
    }
})