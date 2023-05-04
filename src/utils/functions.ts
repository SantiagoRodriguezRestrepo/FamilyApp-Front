import { API_HOST } from '../constants/Api';
import { FetchWrapperOptions } from './types';

export const fetchWrapper = async (
  url: string,
  options?: FetchWrapperOptions
): Promise<any> => {
  const response = await fetch(`${API_HOST}${url}`, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export const handleOnlyNumbers = (value: string) => value.replace(/\D/g, '');
