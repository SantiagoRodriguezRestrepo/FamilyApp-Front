import React, { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../../../context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/Routes';
import { Container, Row, Offcanvas, Nav } from 'react-bootstrap';
import { CgLogOut } from 'react-icons/cg';
import { RiUserSettingsLine } from 'react-icons/ri';
import { Tb360View } from 'react-icons/tb';
import {
  ColLeft,
  BodyCanvas,
  ColRight,
  MainContainer,
  MenuIcon,
  Name,
  Option,
  ProfileImage,
} from './style';
import LogoImage from '../../../assets/logo64.png';
import { AdministratorMessage } from '../components/administratorMessage/AdministratorMessage';
import { ADMIN_OPTIONS } from '../../../constants/consts';
import { UserManagement } from '../components/userManagement';
import { View } from '../components/view/View';
import { getValues } from '../../../utils/functions';

const AdminDashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<string>('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const isAuthenticated = getValues(authContext?.userAuthenticated);
  const isAdmin = authContext?.userAuthenticated?.rol === 1 ? true : false;
  const location = useLocation();
  const navigation = useNavigate();

  const renderComponent = () => {
    switch (optionSelected) {
      case 'create':
        return <UserManagement />;
      case 'view':
        return <View />;
      default:
        return null;
    }
  };
  const renderIcon = (name: string) => name.includes('Usuarios');

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authContext!.setUserAuthenticated({
      id: '',
      nombre: '',
      apellido: '',
      rol: 0
    });
    localStorage.removeItem('user');
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
                <Name>{authContext?.userAuthenticated?.nombre}</Name>
                <Nav className="justify-content-center flex-grow-1 flex-column w-75">
                  <ul>
                    {ADMIN_OPTIONS.map(adminOption => (
                      <li key={adminOption.VALUE}>
                        <Option
                          role="button"
                          className={`${
                            optionSelected === adminOption.VALUE
                              ? 'option-active'
                              : ''
                          }`}
                          onClick={() => {
                            setOptionSelected(adminOption.VALUE);
                            handleClose();
                          }}
                        >
                          {renderIcon(adminOption.NAME) ? (
                            <RiUserSettingsLine />
                          ) : (
                            <Tb360View />
                          )}
                          {adminOption.NAME}
                        </Option>
                      </li>
                    ))}
                  </ul>
                </Nav>
                <Option
                  className="d-flex gap-2 align-items-center py-2 w-75"
                  onClick={handleLogout}
                >
                  <CgLogOut />
                  Salir
                </Option>
              </div>
            </BodyCanvas>
          </Offcanvas>
        </ColLeft>
        <ColRight>
          <div className="mt-1 d-xl-none">
            <MenuIcon size="18px" color="black" onClick={handleShow} />
          </div>
          <MainContainer>
            {renderComponent() ? (
              renderComponent()
            ) : (
              <AdministratorMessage
                name={authContext?.userAuthenticated?.nombre ?? 'Usuario'}
              />
            )}
          </MainContainer>
        </ColRight>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
