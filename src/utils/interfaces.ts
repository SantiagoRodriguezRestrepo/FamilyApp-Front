import { BehaviorSubject } from 'rxjs';

import { TButtonColor } from './types';

export interface IStyleResponsive {
  isMobile?: boolean;
}

export interface IStyleButton {
  color: TButtonColor;
  isMobile?: boolean;
}

export interface ITokenService {
  sendData(data: any): void;
  getData(): BehaviorSubject<any>;
}

export interface IUser {
  sub?: string;
  id: string;
  nombre: string;
  apellido: string;
  rol: number;
}
