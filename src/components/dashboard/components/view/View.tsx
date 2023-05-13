import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { ButtonCustom, Card } from '../../../../theme/components/style';
import { TiDocumentDelete } from 'react-icons/ti';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { MdCleaningServices, MdOutlineImageSearch } from 'react-icons/md';
import { useState } from 'react';
import { toast } from 'sonner';
import { PopUpImage } from './components/popUpImage/PopUpImage';

export const View = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const provicional = [
    {
      id_usuario: '1012458610',
      nombre: 'Edwarr',
      apellido: 'Roldan',
      tipoUsuario: 2,
      contrasena: 'Bogota2023.',
    },
    {
      id_usuario: '117234562',
      nombre: 'Juan',
      apellido: 'Paez',
      tipoUsuario: 2,
      contrasena: 'Bogota2023.',
    },
    {
      id_usuario: '1192785436',
      nombre: 'Johan',
      apellido: 'Sandoval',
      tipoUsuario: 2,
      contrasena: 'Bogota2023.',
    },
    {
      id_usuario: '1192786859',
      nombre: 'Vincent',
      apellido: 'Rodriguez',
      tipoUsuario: 1,
      contrasena: 'Colombia2023*',
    },
    {
      id_usuario: '1234567890',
      nombre: 'admin',
      apellido: 'admin',
      tipoUsuario: 1,
      contrasena:
        '$2a$10$Dr93cXpVh44IjhTZmq0qBOqJpGRwtSUR7NCE3RhGvwIA10ug4MAL.',
    },
    {
      id_usuario: '52773404',
      nombre: 'Omaira',
      apellido: 'Cardona',
      tipoUsuario: 1,
      contrasena: 'Colombia2023*',
    },
    {
      id_usuario: '527735054',
      nombre: 'Elvia',
      apellido: 'Restrepo',
      tipoUsuario: 2,
      contrasena: 'Bogota2023.',
    },
  ];

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filtered = provicional.filter(
      user =>
        user.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id_usuario.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
      toast.error('No se encontraron resultados');
    } else {
      setFilteredUsers(filtered);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchQuery(value);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
    setFilteredUsers([]);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container className="text-center pt-3 mt-3">
        <h1 className="mb-5">Imagenes cargadas:</h1>
      </Container>
      <Container fluid className="h-100">
        <Card>
          <Container className="mb-3 w-50">
            <Form.Label>Buscar:</Form.Label>
            <InputGroup className="mb-5">
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <MdOutlineImageSearch />
              </Button>
              <Button variant="outline-secondary" onClick={handleClearFilter}>
                <MdCleaningServices />
              </Button>
            </InputGroup>
          </Container>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Fecha carga</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(filteredUsers.length ? filteredUsers : provicional).map(
                  user => (
                    <tr key={user.id_usuario}>
                      <td>
                        {' '}
                        {user.nombre} {user.apellido}
                      </td>
                      <td>{user.id_usuario}</td>
                      <td>sadasdasdadsasd</td>
                      <td className="d-flex gap-2">
                        <ButtonCustom
                          color="primary"
                          onClick={() => setShowModal(true)}
                        >
                          <HiOutlinePhotograph />
                        </ButtonCustom>
                        <ButtonCustom color="danger">
                          <TiDocumentDelete />
                        </ButtonCustom>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Container>
        </Card>
      </Container>
      <PopUpImage showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};
