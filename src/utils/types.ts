import { Dispatch, SetStateAction } from 'react';

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

export type PropsCreate = {
  fetchData: () => Promise<void>;
  setIsUser: Dispatch<SetStateAction<boolean>>;
};

export type PropsPopUpImage = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
