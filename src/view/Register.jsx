import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters')
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
    terms: Yup.boolean()
      .required('You must accept the terms and conditions')
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    setSubmitting(false);
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <Formik
                      initialValues={{ name: '', email: '', password: '', confirmPassword: '', terms: false }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="text" name="name" id="form3Example1c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                              <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="email" name="email" id="form3Example3c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                              <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" name="password" id="form3Example4c" className="form-control" />
                              <label className="form-label" htmlFor="form3Example4c">Password</label>
                              <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <Field type="password" name="confirmPassword" id="form3Example4cd" className="form-control" />
                              <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <Field type="checkbox" name="terms" id="form2Example3c" className="form-check-input me-2" />
                            <label className="form-check-label" htmlFor="form2Example3c">
                              I agree to all statements in <a href="#!">Terms of service</a>
                            </label>
                            <ErrorMessage name="terms" component="div" className="text-danger" />
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                              {isSubmitting ? 'Registering...' : 'Register'}
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

export default Register;
