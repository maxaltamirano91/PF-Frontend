import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, deleteUserProfile, logoutUser, getUserProfile } from '../../redux/actions';
import axios from 'axios';
import Form from './Form';
import { updateUserValidationSchema } from './validations';
import { Field, FieldArray } from 'formik';

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.loggedUser);
  const { token } = useSelector((state) => state.auth);

  const [imagenAddHosting, setImagenAddHosting] = useState('');
  const [formError, setFormError] = useState('');
  const [finish, setFinish] = useState(false);

  const handleUploadImagen = async (e) => {
    const imageUpload = e.target.files[0];
    const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';

    if (!imageUpload) return;

    const formData = new FormData();
    formData.append('image', imageUpload);

    try {
      const result = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const urlImagen = result.data.data.url;
      setImagenAddHosting(urlImagen);
    } catch (error) {
      setFormError('Error al subir la imagen');
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setFormError('');

    const userData = {
      ...values,
      image: imagenAddHosting || user.image,
      links: values.links.map((link) => ({
        ...link,
        userId: user.id,
      })),
    };

    try {
      const result = await dispatch(updateUser(userData, token));
      if (result.status === 200) {
        navigate('/myprofile');
      } else {
        const errorMessage = result.data?.message || 'Error al actualizar el usuario';
        setFormError(`Error al actualizar el usuario: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar el usuario. Intente nuevamente más tarde.';
      setFormError(errorMessage);
    } finally {
      dispatch(getUserProfile(token));
      setSubmitting(false);
      resetForm();
    }
  };

  const preFinishUser = () => setFinish(true);
  const unFinish = () => setFinish(false);
  const finishUser = async () => {
    try {
      await dispatch(deleteUserProfile(token));
      dispatch(logoutUser());
      navigate('/home');
    } catch (error) {
      setFormError('Error al eliminar el perfil');
    }
  };

  useEffect(() => {
    if (user) {
      setImagenAddHosting(user.image || '');
    }
  }, [user]);

  const socialPlatforms = [
    { name: 'GitHub', value: 'GitHub' },
    { name: 'LinkedIn', value: 'LinkedIn' },
    { name: 'YouTube', value: 'YouTube' },
    { name: 'Facebook', value: 'Facebook' },
    { name: 'Twitter', value: 'Twitter' },
    { name: 'Google', value: 'Google' },
  ];

  const initialValues = {
    userName: user ? user.userName : '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: user ? user.bio : '',
    aboutMe: user ? user.aboutMe : '',
    image: '',
    links: user ? user.links : [],
    selectedPlatform: '',
    linkUrl: '',
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        {formError && (
          <div className="alert alert-danger" role="alert">
            {formError}
          </div>
        )}

        <Form
          title="Tus nuevos datos"
          initialValues={initialValues}
          validationSchema={updateUserValidationSchema}
          onSubmit={handleSubmit}
          fields={[
            { name: 'userName', type: 'text', label: 'Nombre' },
            { name: 'currentPassword', type: 'password', label: 'Contraseña Actual' },
            { name: 'newPassword', type: 'password', label: 'Nueva Contraseña' },
            { name: 'confirmPassword', type: 'password', label: 'Confirmar Contraseña' },
            { name: 'bio', type: 'text', label: 'Biografía' },
            { name: 'aboutMe', type: 'text', label: 'About Me' },
          ]}
          aditionalContent={(formik) => (
            <>
              <input
                type="file"
                name="image"
                onChange={handleUploadImagen}
                className="form-control mb-3"
              />
              <label>Imagen</label>

              {user && user.planName === 'Premium' && (
                <>
                  <div className="mb-3">
                    <label htmlFor="selectedPlatform">Plataforma:</label>
                    <Field as="select" name="selectedPlatform" className="form-control">
                      <option value="" label="Selecciona una plataforma" />
                      {socialPlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="linkUrl">URL:</label>
                    <Field type="url" name="linkUrl" className="form-control" />
                  </div>
                  <FieldArray name="links">
                    {({ push, remove }) => (
                      <div>
                        {formik.values.links && formik.values.links.length > 0 ? (
                          formik.values.links.map((link, index) => (
                            <div key={index} className="mb-3">
                              <div>
                                Plataforma: {link.name}
                                <br />
                                URL: {link.url}
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="btn btn-danger mt-2"
                              >
                                Eliminar Enlace
                              </button>
                            </div>
                          ))
                        ) : (
                          <p>No hay enlaces agregados.</p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const { selectedPlatform, linkUrl } = formik.values;
                            if (selectedPlatform && linkUrl) {
                              push({
                                name: selectedPlatform,
                                url: linkUrl,
                              });
                              formik.setFieldValue('selectedPlatform', '');
                              formik.setFieldValue('linkUrl', '');
                            } else {
                              alert('Selecciona una plataforma y proporciona una URL.');
                            }
                          }}
                          className="btn btn-primary mt-2"
                        >
                          Agregar Enlace
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </>
              )}
            </>
          )}
        />
        <button
          type="button"
          className="btn btn-danger mt-3"
          onClick={preFinishUser}
        >
          Eliminar Cuenta
        </button>
        {finish && (
          <div className="alert alert-warning mt-3">
            ¿Estás seguro de que deseas eliminar tu cuenta?
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={finishUser}
              >
                Confirmar
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={unFinish}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateUserForm;
