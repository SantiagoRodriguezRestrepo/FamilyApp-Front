import { useState } from 'react';
import { Familiar } from './Familiar/Familiar';
import './style.css';
import { Reclusa } from './Recluso/Reclusa';
import { Container } from 'react-bootstrap';
import { ButtonCustom, Card } from '../../../../../theme/components/style';

export const CreateUser = ({ fetchData }: any) => {
  const [isUser, setIsUser] = useState(true);

  return (
    <>
      <Container className="text-center pt-3 mt-3">
        <h1>Administración de usuarios</h1>
      </Container>
      <Container className="d-flex flex-column mt-5">
        <Card>
          <div className="d-flex justify-content-between mb-5">
            <h3>Crear {isUser ? 'usuario' : 'reclusa'}:</h3>
            <ButtonCustom color="primary" onClick={() => setIsUser(!isUser)}>
              Cambiar a {isUser ? 'reclusa' : 'usuario'}
            </ButtonCustom>
          </div>
          {isUser ? (
            <Familiar fetchData={fetchData} setIsUser={setIsUser} />
          ) : (
            <Reclusa />
          )}
        </Card>
      </Container>
    </>
  );
};
