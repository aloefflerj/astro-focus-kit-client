import { createContext } from 'react';
import { IUser } from '../common/types';

export type AuthContextType = {
  user: IUser | null;
  signin: (mail: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);