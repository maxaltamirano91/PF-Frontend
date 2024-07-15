import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerUser } from '../../redux/actions';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error } = useSelector((state) => state.register);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'El nombre debe contener solo letras')
      .min(2, 'El nombre es muy corto')
      .max(50, 'El nombre es muy largo')
      .required('El nombre es requerido'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe contener al menos 6 caracteres')
      .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirma tu contraseña'),
    terms: Yup.boolean()
      .required('Debes aceptar todas las declaraciones de los Términos de servicio')
      .oneOf([true], 'Debes aceptar todas las declaraciones de los Términos de servicio'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { userName, email, password } = values;
    const user = { userName, email, password };
    
    try {
      await dispatch(registerUser(user));
      setSubmitting(false);
      navigate('/login'); 
    } catch (error) {
      console.error('Error during registration:', error);
      setSubmitting(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card" style={{ borderRadius: '25px', border: '2px solid #000' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <Formik
                      initialValues={{ userName: '', email: '', password: '', confirmPassword: '', terms: false }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="text" name="userName" id="form3Example1c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example1c">Nombre de usuario</label>
                              <ErrorMessage name="userName" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="email" name="email" id="form3Example3c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example3c">Email</label>
                              <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" name="password" id="form3Example4c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example4c">Contraseña</label>
                              <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" name="confirmPassword" id="form3Example4cd" className="form-control" />
                              <label className="form-label" htmlFor="form3Example4cd">Repite la contraseña</label>
                              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <Field type="checkbox" name="terms" id="form2Example3c" className="form-check-input me-2" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              Estoy de acuerdo con todas las declaraciones en <a href="#!">Términos de servicios</a>
                            </label>
                            <ErrorMessage name="terms" component="div" className="text-danger" />
                          </div>

                          {error && <div className="text-danger text-center mb-3">{error}</div>}

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting || loading}>
                              {isSubmitting || loading ? 'Registrando...' : 'Registrar'}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
