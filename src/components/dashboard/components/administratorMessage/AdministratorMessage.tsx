import { Container } from 'react-bootstrap';
import { Card } from '../../../../theme/components/style';

interface Props {
  name: string;
}

export const AdministratorMessage = ({ name }: Props) => {
  return (
    <Container fluid>
      <Card className="text-center mt-5">
        <h1>Bienvenido {name}</h1>
      </Card>
    </Container>
  );
};
