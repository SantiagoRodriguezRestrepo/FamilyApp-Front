import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IRecluse } from '../../../../../../models/authUser';
import { ButtonCustom } from '../../../../../../theme/components/style';
import { END_POINTS } from '../../../../../../constants/Api';
import { fetchWrapper, handleInputChangeNumber, handleInputChangeString } from '../../../../../../utils/functions';
import { toast } from 'sonner';
import { TPropsCreateRecluse } from '../../../../../../utils/types';

export const Reclusa = ({ fetchDataRecluse }: TPropsCreateRecluse) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IRecluse>({ mode: 'onChange' });

  const onSubmit = async (data: IRecluse) => {
    try {
      const url = `${END_POINTS.RECLUSE}?idReclusa=${data.idReclusa}&nombre=${data.nombre}&apellido=${data.apellido}&idFamiliar=${data.idFamiliar}`;
      const options = { method: 'POST' };
      await fetchWrapper(url, options);
      fetchDataRecluse();
      reset();
    } catch (error) {
      fetchDataRecluse();
      toast.error('No se ha podido crear la reclusa.');
      throw new Error(`Error al crear reclusa: ${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ej: Santiago"
              {...register('nombre', {
                required: 'Debe ingresar un nombre',
              })}
              onInput={handleInputChangeString}
            />
            {errors.nombre && (
              <span className="text-danger small">{errors.nombre.message}</span>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="Ej: Rodriguez Aguiar"
              {...register('apellido', {
                required: 'Debe ingresar un apellido',
              })}
              onInput={handleInputChangeString}
            />
            {errors.apellido && (
              <span className="text-danger small">
                {errors.apellido.message}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Cédula reclusa:</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              pattern="[0-9]*"
              placeholder="Ej: 7895432234"
              onInput={handleInputChangeNumber}
              {...register('idReclusa', {
                required: 'Debe ingresar un número de cédula',
              })}
            />
            {errors.idReclusa && (
              <span className="text-danger small">
                {errors.idReclusa.message}
              </span>
            )}
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Cédula usuario:</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              pattern="[0-9]*"
              placeholder="Ej: 7895432234"
              onInput={handleInputChangeNumber}
              {...register('idFamiliar', {
                required: 'Debe ingresar un número de cédula de un familiar',
              })}
            />
            {errors.idFamiliar && (
              <span className="text-danger small">
                {errors.idFamiliar.message}
              </span>
            )}
          </Form.Group>
        </Col>
      </Row>
      <ButtonCustom color="primary" type="submit" className="text-rigth">
        Crear reclusa
      </ButtonCustom>
    </Form>
  );
};
