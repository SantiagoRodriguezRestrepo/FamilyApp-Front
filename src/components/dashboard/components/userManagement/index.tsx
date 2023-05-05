import { fetchWrapper } from '../../../../utils/functions';
import { IUser } from '../../../../models/authUser';
import { useEffect, useState } from 'react';
import { CreateUser } from './createUser/CreateUser';
import { DeleteUser } from './deleteUser/DeleteUser';
import { END_POINTS } from '../../../../constants/Api';

export const UserManagement = () => {
  const [dataUser, setDataUser] = useState<IUser[]>([
    {
      id_usuario: '',
      nombre: '',
      apellido: '',
      tipoUsuario: 0,
      contrasena: '',
    },
  ]);

  const fetchData = async () => {
    try {
      const url = END_POINTS.USERS;
      const options = { method: 'GET' };
      const userData: IUser[] = await fetchWrapper(url, options);
      setDataUser(userData);
    } catch (error) {
      throw new Error(`Error al consultar usuarios: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CreateUser fetchData={fetchData} />
      <DeleteUser dataUser={dataUser} fetchData={fetchData} />
    </>
  );
};
