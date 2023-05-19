import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { CgLogOut } from 'react-icons/cg';
import LogoImage from '../../../assets/logo64.png';
import { ProfileImage, Name, MainContainer, Option } from '../admin/style';
import { AuthContext, AuthContextType } from '../../../context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/Routes';
import { HaderUser } from './style';
import { ButtonCustom, Card } from '../../../theme/components/style';
import { useForm } from 'react-hook-form';
import { IRecluse, IRegister } from '../../../utils/interfaces';
import { END_POINTS } from '../../../constants/Api';
import { fetchWrapper, getValues } from '../../../utils/functions';
import { toast } from 'sonner';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export const UserDashboard = () => {
  const [dataUser, setDataUser] = useState<IRecluse[]>([]);
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const navigation = useNavigate();
  const isAuthenticated = getValues(authContext?.userAuthenticated);
  const isUser = authContext?.userAuthenticated?.rol === 2 ? true : false;
  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const url = `${END_POINTS.RECLUSE}/consultar-familiar/${authContext?.userAuthenticated?.id}`;
      const options = { method: 'GET' };
      const response = await fetchWrapper(url, options);
      setDataUser(response);
    } catch (error) {
      throw new Error(`Error al crear registro: ${error}`);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegister>({ mode: 'onChange' });

  const onSubmit = async (data: IRegister) => {
    try {
      const url = `${END_POINTS.RECORD}?titulo=${data.title}&estado=1&comentario=${data.description}&idReclusa=${data.family}`;
      const formData = new FormData();
      formData.append('adjunto', data.file[0]);
      const options = { method: 'POST', body: formData };
      await fetchWrapper(url, options);
      toast.success('Registro creado.');
      reset();
    } catch (error) {
      throw new Error(`Error al crear registro: ${error}`);
    }
  };

  if (!isAuthenticated || !isUser) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authContext!.setUserAuthenticated({
      id: '',
      nombre: '',
      apellido: '',
      rol: 0,
    });
    localStorage.removeItem('user');
    navigation(ROUTES.LOGIN);
  };

  return (
    <Container fluid className="h-100">
      <Row>
        <HaderUser>
          <Col>
            <div className="d-flex justify-content-around align-items-center flex-wrap">
              <Col className="d-flex gap-3 align-items-center">
                <ProfileImage
                  className="my-3 ms-5"
                  src={LogoImage}
                  alt="Familiapp"
                />
                <Name className="text-white">
                  {authContext?.userAuthenticated?.nombre}
                </Name>
              </Col>
              <Col>
                <h1 className="h-auto text-white text-center">Familiapp</h1>
              </Col>
              <Col className="d-flex justify-content-end me-5">
                <Option
                  className="d-flex gap-2 py-2 w-25"
                  onClick={handleLogout}
                >
                  <CgLogOut />
                  Salir
                </Option>
              </Col>
            </div>
          </Col>
        </HaderUser>
      </Row>
      <Row>
        <Col>
          <MainContainer>
            <Card className="mt-5">
              <h2 className="text-center mb-5">Cargar registro</h2>
              <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-center">
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Titulo:</Form.Label>
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        placeholder="Ej: Sala de la casa"
                        {...register('title', {
                          required: 'Debe ingresar un titulo',
                        })}
                      />
                      {errors.title && (
                        <span className="text-danger small">
                          {errors.title.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Familiar:</Form.Label>
                      <Form.Select
                        defaultValue=""
                        {...register('family', {
                          required: 'Debe seleccionar un familiar',
                        })}
                      >
                        <option value="" disabled>
                          Seleccionar
                        </option>
                        {dataUser.map(user => (
                          <option value={user.idReclusa} key={user.idReclusa}>
                            {`${user.idReclusa} - ${user.nombre} ${user.apellido}`}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.family && (
                        <span className="text-danger small">
                          {errors.family.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Comentario:</Form.Label>
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        as="textarea"
                        rows={3}
                        placeholder="Ej: En este espacio puedes encontrar la sala de la casa"
                        {...register('description', {
                          required: 'Debe ingresar un comentario',
                        })}
                      />
                      {errors.description && (
                        <span className="text-danger small">
                          {errors.description.message}
                        </span>
                      )}
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            Edwarr Malvado
                          </Tooltip>
                        }
                      >
                        <Form.Label>
                          Cargar imagen:&nbsp;
                          <AiOutlineInfoCircle />
                        </Form.Label>
                      </OverlayTrigger>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        {...register('file', {
                          required: 'Debe cargar una imagen',
                          validate: {
                            isImage: value => {
                              const fileType = value[0]?.type;
                              const isImage =
                                fileType && fileType.includes('image/');
                              if (!isImage) {
                                reset({ file: '' });
                                return 'El archivo debe ser una imagen';
                              }
                              return true;
                            },
                          },
                        })}
                      />
                      {errors.file && (
                        <span className="text-danger small">
                          {errors.file.message?.toString()}
                        </span>
                      )}
                    </Form.Group>
                    <ButtonCustom
                      color="primary"
                      type="submit"
                      className="mt-3"
                      style={{ float: 'right' }}
                    >
                      Crear
                    </ButtonCustom>
                  </Col>
                </Row>
              </Form>
            </Card>
          </MainContainer>
        </Col>
      </Row>
    </Container>
  );
};
