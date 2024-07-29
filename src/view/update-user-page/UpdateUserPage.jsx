import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUserProfile, logoutUser } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './UpdateUserPage.module.css';

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.loggedUser);
    const { token } = useSelector((state) => state.auth);

    const [imagenAddHosting, setImagenAddHosting] = useState('');
    const [finish, setFinish] = useState(false);
    const [formError, setFormError] = useState(''); 

    const handleUploadImagen = async (e) => {
        const imageUpload = e.target.files[0];
        const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';

        if (!imageUpload) {
            return;
        }

        const formData = new FormData();
        formData.append('image', imageUpload);

        try {
            const result = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const urlImagen = result.data.data.url;
            setImagenAddHosting(urlImagen);
        } catch (error) {
        }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setFormError(''); 
    
        const userData = {
            ...values,
            image: imagenAddHosting || user.image,
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
            setSubmitting(false);
            resetForm();
        }
    };
    
    

    const preFinishUser = () => {
        setFinish(true);
    };

    const unFinish = () => {
        setFinish(false);
    };

    const finishUser = async () => {
        try {
            await dispatch(deleteUserProfile(token));
            dispatch(logoutUser());
            navigate('/home');
        } catch (error) {
        }
    };

    useEffect(() => {
        if (user) {
            setImagenAddHosting(user.image || '');
        }
    }, [user]);

    return (
        <div className="row justify-content-center">
            <div className={styles.centerDiv}>
                {user && (
                    <div style={{ width: "100%" }}>
                        <h4 className="text-center mb-4" style={{ border: "none" }}>
                            Tus datos actuales
                        </h4>
                        <ul className="list-group">
                            <li className="list-group-item" style={{ border: "none" }}>
                                <p style={{ display: "inline", fontWeight: "bold" }}>Nombre: </p> {user.userName}
                            </li>
                            <li className="list-group-item" style={{ border: "none" }}>
                                <p style={{ display: "inline", fontWeight: "bold" }}>Contraseña: ******</p>
                            </li>
                            <li className="list-group-item" style={{ border: "none" }}>
                                <p style={{ display: "inline", fontWeight: "bold" }}>Biografía: </p> {user.bio}
                            </li>
                            <li className="list-group-item" style={{ border: "none" }}>
                                <img width="400px" src={user.image} alt="User" />
                            </li>
                        </ul>
                    </div>
                )}
                <br />
                <br />
                <h4 className="text-center mb-4" style={{ border: "none" }}>
                    Tus nuevos datos
                </h4>

                {formError && (
                    <div className="alert alert-danger" role="alert">
                        {formError}
                    </div>
                )}

                <Formik
                    initialValues={{
                        userName: user ? user.userName : '',
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                        bio: user ? user.bio : '',
                        image: '',
                        premiumFeature1: '',
                        premiumFeature2: '',
                    }}
                    validationSchema={Yup.object({
                        userName: Yup.string().required('Requerido'),
                        currentPassword: Yup.string().required('Requerido'),
                        newPassword: Yup.string().min(6, 'Debe tener al menos 6 caracteres'),
                        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir'),
                        bio: Yup.string(),
                        image: Yup.string(),
                        premiumFeature1: Yup.string(),
                        premiumFeature2: Yup.string(),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form style={{ width: "50%" }}>
                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    className={`form-control ${styles["custom-input"]}`}
                                />
                                <label htmlFor="userName" className={`${styles["form-label"]}`}>Nombre</label>
                                <ErrorMessage name="userName" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3 position-relative">
                                <Field
                                    type="password"
                                    name="currentPassword"
                                    className={`form-control ${styles['custom-input']}`}
                                />
                                <label className={`${styles['form-label']}`}>Contraseña Actual</label>
                                <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3 position-relative">
                                <Field
                                    type="password"
                                    name="newPassword"
                                    className={`form-control ${styles['custom-input']}`}
                                />
                                <label className={`${styles['form-label']}`}>Nueva Contraseña</label>
                                <ErrorMessage name="newPassword" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3 position-relative">
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-control ${styles['custom-input']}`}
                                />
                                <label className={`${styles['form-label']}`}>Confirmar Contraseña</label>
                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="bio"
                                    className={`form-control ${styles['custom-input']}`}
                                />
                                <label className={`${styles['form-label']}`}>Biografía</label>
                                <ErrorMessage name="bio" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3 position-relative">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleUploadImagen}
                                    className={`form-control ${styles['custom-input']}`}
                                />
                                <label className={`${styles['form-label']}`}>Imagen</label>
                                <ErrorMessage name="image" component="div" className="text-danger" />
                            </div>

                            <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles['submit-button']}`}>
                                Actualizar Datos
                            </button>
                        </Form>
                    )}
                </Formik>

                <br />
                <br />
                {finish ? (
                    <div>
                        <p>¿Seguro que deseas eliminar tu perfil?</p>
                        <button onClick={finishUser} className="btn btn-danger">Sí</button>
                        <button onClick={unFinish} className="btn btn-secondary">Cancelar</button>
                    </div>
                ) : (
                    <button onClick={preFinishUser} className="btn btn-danger">Eliminar perfil</button>
                )}
            </div>
        </div>
    );
};

export default UpdateUserPage;