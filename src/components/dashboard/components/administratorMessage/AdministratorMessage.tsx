import { Container } from 'react-bootstrap';
import { Card } from '../../../../theme/components/style';

interface Props {
  name: string;
}

export const AdministratorMessage = ({ name }: Props) => {
  return (
    <Container fluid>
      <Card className="mt-5">
        <h1 className="text-center mb-5">Bienvenido {name}!</h1>
        <span style={{ fontSize: '1.5rem' }}>
          En este módulo de administración, tendrás la capacidad de gestionar a
          todos los usuarios y registros relacionados en el sistema. Podrás
          eliminar, crear y visualizar usuarios existentes, además de poder
          acceder a la pantalla de visualización y eliminación de diversos
          registros almacenados.
        </span>
        <br />
        <br />
        <span style={{ fontSize: '1.5rem' }}>
          Por favor para empezar seleccione el modulo de su preferencia.
        </span>
      </Card>
    </Container>
  );
};
