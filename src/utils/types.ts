import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../models/authUser';
import { IRecluse } from './interfaces';

export type TFetchWrapperOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
};

export type TButtonColor = 'primary' | 'danger';

export type TToken = {
  token: string;
};

export type TPropsLogin = {
  setToken: (token: string) => void;
};

export type TPropsCreateFamiliar = {
  fetchDataUser: () => Promise<void>;
  setIsUser: Dispatch<SetStateAction<boolean>>;
};
export type TPropsCreateRecluse = {
  fetchDataRecluse: () => Promise<void>;
};

export type TPropsPopUpImage = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  image: string;
};

export type TPropsDeleteUser = {
  dataRecluse: IRecluse[];
  dataUser: IUser[];
  fetchDataUser: () => Promise<void>;
  fetchDataRecluse: () => Promise<void>;
};
