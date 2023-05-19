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
export interface IRecord {
  nombre: string;
  apellido: string;
  idRegistro: number;
  urlImagen: string;
  titulo: string;
  comentario: string;
  fecha: Date;
  estado: number;
  idReclusa: string;
}
export interface IRecluse {
  idReclusa: string;
  nombre: string;
  apellido: string;
  representante: string;
}
export interface IRegister {
  title: string;
  family: string;
  description: string;
  file: any;
}
