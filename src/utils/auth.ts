// import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { IUser } from './interfaces';
import { authUser } from '../models/authUser';


export const decodeJWT = (token: string): IUser | null => {
  try {
    localStorage.setItem('user', JSON.stringify(token));
    const decodedToken: authUser = jwt_decode(token);
    return {
      id: decodedToken.sub,
      nombre: decodedToken.nombre,
      apellido: decodedToken.apellido,
      rol: decodedToken.rol,
    };
  } catch (err) {
    return null;
  }
};
