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
