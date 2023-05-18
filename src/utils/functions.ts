import { API_HOST } from '../constants/Api';
import { IUser } from './interfaces';
import { TFetchWrapperOptions } from './types';

export const fetchWrapper = async (
  url: string,
  options?: TFetchWrapperOptions
): Promise<any> => {
  const response = await fetch(`${API_HOST}${url}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const handleOnlyNumbers = (value: string) => value.replace(/\D/g, '');

export const getValues = (user: IUser | undefined): boolean => {
  if (!user || Object.entries(user).length === 0 || !user.id) {
    return false;
  }
  return true;
};
