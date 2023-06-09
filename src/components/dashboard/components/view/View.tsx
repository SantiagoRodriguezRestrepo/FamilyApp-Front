import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { ButtonCustom, Card } from '../../../../theme/components/style';
import { TiDocumentDelete } from 'react-icons/ti';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { MdCleaningServices, MdOutlineImageSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PopUpImage } from './components/popUpImage/PopUpImage';
import { END_POINTS } from '../../../../constants/Api';
import { fetchWrapper, formatDate } from '../../../../utils/functions';
import { IRecord } from '../../../../utils/interfaces';

export const View = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [records, setRecords] = useState<IRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>('');

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filtered = records.filter(record =>
      record.idReclusa.includes(searchQuery)
    );

    if (filtered.length === 0) {
      toast.error('No se encontraron resultados');
    } else {
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    try {
      const url = END_POINTS.RECORD;
      const options = { method: 'GET' };
      const userData: IRecord[] = await fetchWrapper(url, options);
      setRecords(userData);
    } catch (error) {
      throw new Error(`Error al consultar los registros: ${error}`);
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

  const onDeleteRecord = async (id: number, title: string) => {
    try {
      const url = `${END_POINTS.RECORD}/${id}`;
      const options = { method: 'DELETE' };
      await fetchWrapper(url, options);
      getRecords();
      toast.success(`Registro "${title}" se ha eliminado.`);
    } catch (error) {
      toast.error('No se ha podido eliminar el registro.');
      throw new Error(`Error al eliminar registro: ${error}`);
    }
  };

  const confirmDeleteRecord = (title: string, id: number) => {
    toast.error(`Desea elminar el registro ${title}`, {
      action: {
        label: 'Aceptar',
        onClick: () => onDeleteRecord(id, title),
      },
      cancel: {
        label: 'Cancelar',
        onClick: toast.dismiss,
      },
    });
  };

  return (
    <>
      <Container className="text-center pt-3 mt-3">
        <h1 className="mb-5">Imágenes cargadas</h1>
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
            <Table bordered striped responsive>
              <thead>
                <tr>
                  <th>Cédula reclusa</th>
                  <th>Fecha carga</th>
                  <th>Titulo</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(filteredUsers.length ? filteredUsers : records).map(
                  (record: IRecord) => (
                    <tr key={record.idRegistro}>
                      <td>{record.idReclusa}</td>
                      <td>{formatDate(record.fecha)}</td>
                      <td>{record.titulo}</td>
                      <td>{record.comentario}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <ButtonCustom
                            color="primary"
                            onClick={() => {
                              setShowModal(true);
                              setImage(record.urlImagen);
                            }}
                          >
                            <HiOutlinePhotograph />
                          </ButtonCustom>
                          <ButtonCustom
                            color="danger"
                            onClick={() =>
                              confirmDeleteRecord(
                                record.titulo,
                                record.idRegistro
                              )
                            }
                          >
                            <TiDocumentDelete />
                          </ButtonCustom>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Container>
        </Card>
      </Container>
      {showModal ? (
        <PopUpImage
          showModal={showModal}
          setShowModal={setShowModal}
          image={image}
        />
      ) : (
        <></>
      )}
    </>
  );
};
