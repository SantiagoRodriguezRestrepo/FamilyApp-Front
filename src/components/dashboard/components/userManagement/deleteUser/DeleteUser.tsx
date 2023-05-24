import { Container } from 'react-bootstrap';
import { TiUserDelete } from 'react-icons/ti';
import { toast } from 'sonner';
import { ButtonCustom, Card } from '../../../../../theme/components/style';
import { fetchWrapper } from '../../../../../utils/functions';
import { IUser } from '../../../../../models/authUser';
import { TableCustom } from './style';
import { END_POINTS } from '../../../../../constants/Api';
import { TPropsDeleteUser } from '../../../../../utils/types';
import { useEffect } from 'react';
import { IRecluse } from '../../../../../utils/interfaces';

export const DeleteUser = ({
  dataUser,
  dataRecluse,
  fetchDataUser,
  fetchDataRecluse,
}: TPropsDeleteUser) => {
  const onDeleteUser = async (type: string, id: string) => {
    try {
      const url =
        type === 'user'
          ? `${END_POINTS.USERS}?idUsuario=${id}`
          : `${END_POINTS.RECLUSE}/${id}`;
      const options = { method: 'DELETE' };
      await fetchWrapper(url, options);
      fetchDataUser();
      fetchDataRecluse();
      toast.success(`Se elimino ${type === 'user' ? 'usuario' : 'reclusa'} correctamente`)
    } catch (error) {
      toast.success(`Error al eliminar ${type === 'user' ? 'usuario' : 'reclusa'}: ${error}`)
      throw new Error(
        `Error al eliminar ${type === 'user' ? 'usuario' : 'reclusa'}: ${error}`
      );
    }
  };

  const confirmDeleteUser = (type: string, user: IUser | IRecluse) => {
    toast.error(`Desea elminar a ${user.nombre} ${user.apellido}?`, {
      action: {
        label: 'Aceptar',
        onClick: () => {
          if ('idReclusa' in user) {
            onDeleteUser(type, user.idReclusa);
          } else {
            onDeleteUser(type, user.id_usuario);
          }
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: toast.dismiss,
      },
    });
  };

  useEffect(() => {
    fetchDataRecluse();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="mb-5">
        <h3 className="mb-5">Usuiarios Registrados:</h3>
        <div>
          <TableCustom striped bordered responsive>
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {dataUser.map(user => (
                <tr key={user.id_usuario}>
                  <td>{user.id_usuario}</td>
                  <td>
                    {user.nombre} {user.apellido}
                  </td>
                  <td>
                    {user.tipoUsuario === 1 ? 'Administrador' : 'Familiar'}
                  </td>
                  <td className="d-flex justify-content-center">
                    <ButtonCustom
                      color="danger"
                      onClick={() => confirmDeleteUser('user', user)}
                    >
                      <TiUserDelete />
                    </ButtonCustom>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableCustom>
        </div>
      </Card>
      <Card className="mt-5">
        <h3 className="mb-5">Reclusas registradas:</h3>
        <div>
          <TableCustom striped bordered responsive>
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {dataRecluse.map(recluse => (
                <tr key={recluse.idReclusa}>
                  <td>{recluse.idReclusa}</td>
                  <td>
                    {recluse.nombre} {recluse.apellido}
                  </td>
                  <td className="d-flex justify-content-center">
                    <ButtonCustom
                      color="danger"
                      onClick={() => confirmDeleteUser('recluse', recluse)}
                    >
                      <TiUserDelete />
                    </ButtonCustom>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableCustom>
        </div>
      </Card>
    </Container>
  );
};
