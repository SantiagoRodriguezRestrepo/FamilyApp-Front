import React, { useEffect, useState } from 'react';
import { Container, Row, Offcanvas, Nav } from 'react-bootstrap';
import { CgLogOut } from 'react-icons/cg';
import {
  ColLeft,
  BodyCanvas,
  ProfileImage,
  ColRight,
  MenuIcon,
  Option,
} from '../dashboard/admin/style';
import LogoImage from '../../assets/logo64.png';
import sadDog from '../../assets/sadDog.png';
import { Card } from '../../theme/components/style';
import { ROUTES } from '../../constants/Routes';
import { useNavigate } from 'react-router-dom';
import { TPropsVisualizadorParam } from '../../utils/types';
import { END_POINTS } from '../../constants/Api';
import { fetchWrapper } from '../../utils/functions';
import { toast } from 'sonner';
import { IRecluseRecord } from '../../utils/interfaces';
import { UlCustom } from './style';
import { View } from './components/View';

export const VisualizadorDashboard = ({
  idRecluse,
}: TPropsVisualizadorParam) => {
  const [show, setShow] = useState<boolean>(false);
  const [records, setRecords] = useState<IRecluseRecord[]>([]);
  const [registro, setRregistro] = useState<IRecluseRecord>();
  const [dataRecluse, setDataRecluse] = useState<string>('');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigation = useNavigate();

  const getRecordsbyRecluse = async () => {
    try {
      const url = `${END_POINTS.RECORD}${END_POINTS.RECLUSE}/${idRecluse}`;
      const options = { method: 'GET' };
      const response = await fetchWrapper(url, options);
      setRecords(response);
    } catch (error) {
      toast.error('No se encontraron los registros de la reclusa.');
      throw new Error(`Error al iniciar sesion: ${error}`);
    }
  };

  const getDataRecluse = async () => {
    try {
      const url = `${END_POINTS.RECLUSE}/${idRecluse}`;
      const options = { method: 'GET' };
      const response = await fetchWrapper(url, options);
      setDataRecluse(`${response.nombre} ${response.apellido}`);
    } catch (error) {
      toast.error('No se encontro la reclusa.');
      throw new Error(`Error al iniciar sesion: ${error}`);
    }
  };

  useEffect(() => {
    if (!idRecluse) {
      return navigation(ROUTES.LOGIN);
    }
    getRecordsbyRecluse();
    getDataRecluse();
  }, []);

  const handleBack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigation(ROUTES.LOGIN);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <ColLeft md={2}>
          <Offcanvas
            className="h-100"
            show={show}
            onHide={handleClose}
            responsive="xl"
          >
            <Offcanvas.Header closeButton />
            <BodyCanvas>
              <div className="d-flex flex-column align-items-center text-white w-100 my-5">
                <ProfileImage
                  className="mt-5"
                  src={LogoImage}
                  alt="Familiapp"
                />
                <h1>Familiapp</h1>
                <Nav className="justify-content-center flex-grow-1 flex-column w-75 overflow-auto">
                  <UlCustom>
                    {records.map(record => (
                      <li key={record.idRegistro.toString()}>
                        <Option
                          role="button"
                          className={`${
                            optionSelected === record.idRegistro.toString()
                              ? 'option-active'
                              : ''
                          }`}
                          onClick={() => {
                            setOptionSelected(record.idRegistro.toString());
                            handleClose();
                            setRregistro(record);
                          }}
                        >
                          {record.titulo}
                        </Option>
                      </li>
                    ))}
                  </UlCustom>
                </Nav>
                <Option
                  className="d-flex gap-2 align-items-center py-2 w-75"
                  onClick={handleBack}
                >
                  <CgLogOut />
                  Regresar
                </Option>
              </div>
            </BodyCanvas>
          </Offcanvas>
        </ColLeft>
        <ColRight>
          <div className="mt-1 d-xl-none">
            <MenuIcon size="18px" color="black" onClick={handleShow} />
          </div>
          <Container>
            <Card className="mt-5">
              {!optionSelected ? (
                <div className="text-center">
                  <h2>¡Bienvenida {dataRecluse}!</h2> <br />
                  <span style={{ fontSize: '1.5rem' }}>
                    {records.length > 0 ? (
                      <>
                        En el siguiente espacio encontraras las imagenes que tus
                        familiares han cargado, las podras visualizar en un
                        formato de 360 grados junto con un mensaje que ellos
                        dejaron para ti.
                      </>
                    ) : (
                      <>
                        ¡Lo sentimos! No se encontraron registros. <br />
                        <img
                          src={sadDog}
                          width={200}
                          alt="No se encontraron registros"
                        />
                      </>
                    )}
                  </span>
                </div>
              ) : (
                <View {...registro} />
              )}
            </Card>
          </Container>
        </ColRight>
      </Row>
    </Container>
  );
};
