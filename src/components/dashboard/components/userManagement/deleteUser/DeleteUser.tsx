import { Container } from 'react-bootstrap';
import { TiUserDelete } from 'react-icons/ti';
import { toast } from 'sonner';
import { ButtonCustom, Card } from '../../../../../theme/components/style';
import { fetchWrapper } from '../../../../../utils/functions';
import { IUser } from '../../../../../models/authUser';
import { TableCustom } from './style';
import { END_POINTS } from '../../../../../constants/Api';

type Props = {
  dataUser: IUser[];
  fetchData: () => Promise<void>;
};

export const DeleteUser = ({ dataUser, fetchData }: Props) => {
  const onDeleteUser = async (id: string) => {
    try {
      const url = `${END_POINTS.USERS}?idUsuario=${id}`;
      const options = { method: 'DELETE' };
      await fetchWrapper(url, options);
      fetchData();
    } catch (error) {
      fetchData();
      throw new Error(`Error al eliminar usuario: ${error}`);
    }
  };

  const confirmDeleteUser = (user: IUser) => {
    toast.error(`Desea elminar a ${user.nombre} ${user.apellido}?`, {
      action: {
        label: 'Aceptar',
        onClick: () => onDeleteUser(user.id_usuario),
      },
      cancel: {
        label: 'Cancelar',
        onClick: toast.dismiss,
      },
    });
  };

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
                      onClick={() => confirmDeleteUser(user)}
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
