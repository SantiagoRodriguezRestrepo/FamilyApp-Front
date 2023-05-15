import { fetchWrapper } from '../../../../utils/functions';
import { IUser } from '../../../../models/authUser';
import { useEffect, useState } from 'react';
import { CreateUser } from './createUser/CreateUser';
import { DeleteUser } from './deleteUser/DeleteUser';
import { END_POINTS } from '../../../../constants/Api';
import { IRecluse } from '../../../../utils/interfaces';

export const UserManagement = () => {
  const [dataRecluse, setDataRecluse] = useState<IRecluse[]>([]);
  const [dataUser, setDataUser] = useState<IUser[]>([]);

  const fetchDataUser = async () => {
    try {
      const url = END_POINTS.USERS;
      const options = { method: 'GET' };
      const userData: IUser[] = await fetchWrapper(url, options);
      setDataUser(userData);
    } catch (error) {
      throw new Error(`Error al consultar usuarios: ${error}`);
    }
  };

  const fetchDataRecluse = async () => {
    try {
      const url = END_POINTS.RECLUSE;
      const options = { method: 'GET' };
      const prueba: IRecluse[] = await fetchWrapper(url, options);
      setDataRecluse(prueba);
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error}`);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  return (
    <>
      <CreateUser
        fetchDataUser={fetchDataUser}
        fetchDataRecluse={fetchDataRecluse}
      />
      <DeleteUser
        dataRecluse={dataRecluse}
        dataUser={dataUser}
        fetchDataUser={fetchDataUser}
        fetchDataRecluse={fetchDataRecluse}
      />
    </>
  );
};
