export interface authUser {
  rol: number;
  nombre: string;
  apellido: string;
  sub: string;
  exp: number;
}

export interface IUser {
  id_usuario: string;
  nombre: string;
  apellido: string;
  tipoUsuario: number;
  contrasena: string;
}
