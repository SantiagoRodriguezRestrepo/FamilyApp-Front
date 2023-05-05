import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { USER_TYPES } from '../../../../../constants/consts';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ButtonCustom, Card } from '../../../../../theme/components/style';
import bcrypt from 'bcryptjs';
import { fetchWrapper } from '../../../../../utils/functions';
import { IUser } from '../../../../../models/authUser';
import { END_POINTS } from '../../../../../constants/Api';

type Props = {
  fetchData: () => Promise<void>;
};
export const CreateUser = ({ fetchData }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<IUser>({
    nombre: '',
    apellido: '',
    id_usuario: '',
    tipoUsuario: 0,
    contrasena: '',
  });

  useEffect(() => {}, [dataUser]);

  const encryptPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error(`Error al cifrar la contraseña: ${error}`);
    }
  };

  const onSubmit = async (data: IUser) => {
    const formatData = {
      ...data,
      tipoUsuario: Number(data.tipoUsuario),
      contrasena: await encryptPassword(data.contrasena),
    };
    setDataUser(formatData);

    try {
      const url = `${END_POINTS.SIGNUP}?idUsuario=${data.id_usuario}&nombre=${data.nombre}&apellido=${data.apellido}&tipoUsuario=${data.tipoUsuario}&contrasena=${formatData.contrasena}`;
      const options = { method: 'POST' };
      await fetchWrapper(url, options);
      await fetchData();
    } catch (error) {
      await fetchData();
      throw new Error(`Error al crear usuario: ${error}`);
    }
  };

  return (
    <>
      <Container className="text-center pt-3 mt-3">
        <h1>Administración de usuarios</h1>
      </Container>
      <Container className="d-flex flex-column mt-5">
        <Card>
          <h3 className="mb-5">Crear Usuario:</h3>
          <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres:</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    placeholder="Ej: Juan Santiago"
                    {...register('nombre', {
                      required: 'Debe ingresar un nombre',
                    })}
                  />
                  {errors.nombre && (
                    <span className="text-danger small">
                      {errors.nombre.message}
                    </span>
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
                  <Form.Label>Cédula:</Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    pattern="[0-9]*"
                    placeholder="Ej: 7895432234"
                    onInput={(event: any) => {
                      event.target.value = event.target.value.replace(
                        /[^0-9]/g,
                        ''
                      );
                    }}
                    {...register('id_usuario', {
                      required: 'Debe ingresar un numero de cédula',
                    })}
                  />
                  {errors.id_usuario && (
                    <span className="text-danger small">
                      {errors.id_usuario.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de usuario:</Form.Label>
                  <Form.Select
                    {...register('tipoUsuario', {
                      required: 'Debe seleccionar un tipo de usuario',
                    })}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    {USER_TYPES.map(type => (
                      <option value={type.VALUE} key={type.NAME}>
                        {type.NAME}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.tipoUsuario && (
                    <span className="text-danger small">
                      {errors.tipoUsuario.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Label>Contraseña:</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    {...register('contrasena', {
                      required: 'Debe ingresar una contraseña',
                    })}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </InputGroup>
                {errors.contrasena && (
                  <span className="text-danger small">
                    {errors.contrasena.message}
                  </span>
                )}
              </Col>
            </Row>
            <ButtonCustom color="primary" type="submit" className="text-rigth">
              Crear usuario
            </ButtonCustom>
          </Form>
        </Card>
      </Container>
    </>
  );
}
