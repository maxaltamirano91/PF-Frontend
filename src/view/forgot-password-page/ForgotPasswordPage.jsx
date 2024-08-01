import {useState, useEffect} from 'react';
import emailjs from 'emailjs-com';
import code from '../../utils/code-ForgotPassword';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordPage = () => {
  
  function sendMail(){
    (function(){
      emailjs.init("_aFYU2nqDgFtmejG7") 
    })()
    let serviceID = "service_eiqzotg";
    let templateID = "template_06oh7b7";
    emailjs.send(serviceID, templateID, {input_mail, code2})
    .then( res => {
      alert("Email send successfully!")
    })
    .catch()
  }
  
  const [input_mail, setInput_mail] = useState("\n")
  const [input_code, setInput_code] = useState("\n")
  
  const change_mail = event => {
    event.preventDefault();
    const {value} = event.target;
    setInput_mail(
      value
    )
  } 

  const change_code = event => {
    event.preventDefault();
    const {value} = event.target;
    setInput_code(
      value
    )
  }

  const [code_input, setCode_input] = useState(false);
  
  // const deit = new Date();
  // const code = Math.floor((((Number(deit.getTime())/100000)%1).toFixed(5))*100000);
  
  const [code2, setCode2] = useState("DX");
  useEffect(() => {
    setCode2(code());
  }, [])
  
  const put_code = () => {
    setCode_input(true);
    sendMail();
  }

  const newPass = () => {
    Number(input_code) === Number(code2) ? alert("Enter your new password") : null
  }

    // return (
     
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
            Enter your email address and we'll send you an email with instructions to reset your password.
          </p>

          <div data-mdb-input-init className="form-outline">
            <input type="mail" key="mail" name="mail" id="mail" value={input_mail} onChange={change_mail} className="form-control my-3" required/>
          </div>
          <a href="#" data-mdb-ripple-init className="btn btn-primary w-100" onClick={put_code}>Reset password</a>
          {/* {code_input ? <input type="email" key="code" name="code" id="code" value={input_code} onChange={change_code} placeholder="Code on your mail" className="form-control my-3" required/> : null}
          {code_input ? <a href="#" data-mdb-ripple-init className="btn btn-primary w-100" onClick={newPass}>Create new password</a> : null} */}
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

export default ForgotPasswordPage;