import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { END_POINTS } from "../../constants/Api";
import { fetchWrapper, handleOnlyNumbers } from "../../utils/functions";
import { toast } from "sonner";
import LogoImage from '../../assets/logo64.png';
import { Hr, LoginContainer, LogoContainer, MainContainer, RowLogin, SearchContainer } from "./style";
import { ButtonCustom, Logo } from "../../theme/components/style";

export const LoginForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${END_POINTS.LOGIN}?idUsuario=${userId}&contrasena=${userPassword}`;
      const options = { method: 'POST' };
      const response = await fetchWrapper(url, options);
      console.log("🚀 ~ file: LoginForm.tsx:19 ~ handleLogin ~ response:", response)
    } catch (error) {
      toast.error('Usuario o contraseña invalidos.');
      throw new Error(`Error al iniciar sesion: ${error}`);
    }
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.error('No se encontro el usuario.');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement & { name: 'search' | 'identification' }>) => {
    const { value, name } = event.target;
    const numericValue = handleOnlyNumbers(value);

    name === 'search' ? setSearchQuery(numericValue) : setUserId(numericValue);
  };

  return (
    <MainContainer fluid className="p-0">
      <LogoContainer >
        <Logo src={LogoImage} width={64} height={64} alt="Familiapp" loading="lazy" />
        <h1 className="h-auto">Familiapp</h1>
      </LogoContainer>
      <LoginContainer >
        <RowLogin  className="row w-100 m-0">
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <SearchContainer  className="d-flex gap-4 w-50">
              <Form.Control name="search" id="search" type="text" autoComplete="off" placeholder="Ingresar cédula" value={searchQuery} onChange={handleInputChange} />
              <ButtonCustom color="primary" onClick={handleSearch}> Buscar </ButtonCustom>
            </SearchContainer>
          </Col>
          <Col md="auto" className="d-flex align-items-center">
            <Hr  className="mx-auto" />
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Form className="w-50" onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Usuario</Form.Label>
                <Form.Control name="identification" id="identification" type="text" autoComplete="off" placeholder="Ingresar cédula" value={userId} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="text-white">Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresar contraseña" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
              </Form.Group>
              <ButtonCustom color="primary" className="float-right" type="submit"> Ingresar </ButtonCustom>
            </Form>
          </Col>
        </RowLogin>
      </LoginContainer>
    </MainContainer>
  );
}
