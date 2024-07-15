import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewPasswordPage = () => {
  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Submitting:', values);
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            {"Enter your email address and we'll send you an email with instructions to reset your password."}
          </p>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-outline mb-4">
                  <Field type="email" id="email" name="email" className="form-control my-3" placeholder="Your Email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  Reset password
                </button>
              </Form>
            )}
          </Formik>
          <div className="d-flex justify-content-between mt-4">
            <a href="/login" className="text-decoration-none">Login</a>
            <a href="/register" className="text-decoration-none">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
