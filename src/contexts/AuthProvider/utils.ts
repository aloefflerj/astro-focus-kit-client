import { IUser } from "../../common/types";
import { api } from "../../services/api";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage() {
    const json = localStorage.getItem('user');

    if (!json) {
        return null;
    }

    const user = JSON.parse(json);
    return user ?? null;
}

export async function loginRequest(email: string, password: string) {
    try {
        const request = await api.post('users/auth', { email, password });
        return request.data;
    } catch (error) {
        return null;
    }
}