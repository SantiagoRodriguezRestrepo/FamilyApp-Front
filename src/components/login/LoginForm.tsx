import { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import { END_POINTS } from '../../constants/Api';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {
  fetchWrapper,
  validateValues,
  handleOnlyNumbers,
} from '../../utils/functions';
import { toast } from 'sonner';
import LogoImage from '../../assets/logo64.png';
import {
  Hr,
  LoginContainer,
  LogoContainer,
  MainContainer,
  RowLogin,
  SearchContainer,
} from './style';
import { ButtonCustom, Logo } from '../../theme/components/style';
import { TPropsSearchParams, TToken } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { decodeJWT } from '../../utils/auth';
import { ROUTES } from '../../constants/Routes';

export const LoginForm = ({
  searchQuery,
  setSearchQuery,
}: TPropsSearchParams) => {
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const navigation = useNavigate();

  const validateUserLogged = () => {
    const isAuthenticated = validateValues(authContext?.userAuthenticated);
    const isAdmin = authContext?.userAuthenticated?.rol === 1 ? true : false;

    if (!isAuthenticated) {
      return;
    }
    if (isAdmin) {
      return navigation(ROUTES.ADMIN);
    }
    return navigation(ROUTES.USER);
  };

  useEffect(() => {
    validateUserLogged();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${END_POINTS.LOGIN}?idUsuario=${userId}&contrasena=${userPassword}`;
      const options = { method: 'POST' };
      const response: TToken = await fetchWrapper(url, options);
      const dataUser = decodeJWT(response.token);
      if (authContext && dataUser) {
        authContext.setUserAuthenticated(dataUser);
        if (dataUser.rol === 1) {
          return navigation('/admin');
        }
        navigation('/user');
      }
    } catch (error) {
      toast.error('Usuario o contraseña invalidos.');
      throw new Error(`Error al iniciar sesion: ${error}`);
    }
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const url = `${END_POINTS.RECLUSE}/${searchQuery}`;
      const options = { method: 'GET' };
      const response = await fetchWrapper(url, options);
      if (response !== null) {
        navigation(ROUTES.VISUALIZADOR)
      }
    } catch (error) {
      toast.error('No se encontro la reclusa.');
      throw new Error(`Error al iniciar sesion: ${error}`);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement & { name: 'search' | 'identification' }
    >
  ) => {
    const { value, name } = event.target;
    const numericValue = handleOnlyNumbers(value);

    name === 'search' ? setSearchQuery(numericValue) : setUserId(numericValue);
  };

  return (
    <MainContainer fluid className="p-0">
      <LogoContainer>
        <Logo
          src={LogoImage}
          width={64}
          height={64}
          alt="Familiapp"
          loading="lazy"
        />
        <h1 className="h-auto">Familiapp</h1>
      </LogoContainer>
      <LoginContainer>
        <RowLogin className="row w-100 m-0">
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <SearchContainer className="d-flex gap-4 w-50">
              <Form.Control
                name="search"
                id="search"
                type="text"
                autoComplete="off"
                placeholder="Ingresar cédula"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <ButtonCustom color="primary" onClick={handleSearch}>
                Buscar
              </ButtonCustom>
            </SearchContainer>
          </Col>
          <Col md="auto" className="d-flex align-items-center">
            <Hr className="mx-auto" />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Form className="w-50" onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Usuario</Form.Label>
                <Form.Control
                  name="identification"
                  id="identification"
                  type="text"
                  autoComplete="off"
                  placeholder="Ingresar cédula"
                  value={userId}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Label className="text-white">Contraseña:</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresar contraseña"
                  onChange={e => setUserPassword(e.target.value)}
                />
                <Button
                  variant="secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </Button>
              </InputGroup>
              <ButtonCustom
                color="primary"
                className="float-right"
                type="submit"
              >
                Ingresar
              </ButtonCustom>
            </Form>
          </Col>
        </RowLogin>
      </LoginContainer>
    </MainContainer>
  );
};
