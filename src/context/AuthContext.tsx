import { createContext } from 'react';
import { IUser } from '../utils/interfaces';

export interface AuthContextType {
  userAuthenticated: IUser;
  setUserAuthenticated: (value: IUser) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
