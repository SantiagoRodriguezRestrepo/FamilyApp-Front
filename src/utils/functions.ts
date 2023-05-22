import { API_HOST } from '../constants/Api';
import { MONTHS } from '../constants/consts';
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

export const handleOnlyLetters = (value: string) => value.replace(/[^A-Za-z]/g, '');

export const getValues = (user: IUser | undefined): boolean => {
  if (!user || Object.entries(user).length === 0 || !user.id) {
    return false;
  }
  return true;
};

export const formatDate = (date: Date): string => {
  const fecha = new Date(date);
  const formato = fecha.toLocaleDateString();
  return formato;
};

export const formatDateString = (date: Date): string => {
  const fecha = new Date(date);

  const day = fecha.getDate();
  const monthNumber = fecha.getMonth();
  const year = fecha.getFullYear();

  const monthString = MONTHS[monthNumber];

  return `${day} de ${monthString} de ${year}`;
};

export const handleInputChangeString = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  const stringValue = handleOnlyLetters(value);
  event.target.value = stringValue;
};

export const handleInputChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  const numericValue = handleOnlyNumbers(value);
  event.target.value = numericValue;
};