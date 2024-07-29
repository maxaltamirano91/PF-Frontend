import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUserProfile, logoutUser } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUserValidationSchema } from '../../components/forms/validations'; 
import axios from 'axios';
import styles from './UpdateUserPage.module.css';

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.loggedUser);
    const { token } = useSelector((state) => state.auth);

    const [imagenAddHosting, setImagenAddHosting] = useState('');
    const [finish, setFinish] = useState(false);

    const handleUploadImagen = async (e) => {
        const imageUpload = e.target.files[0];
        const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';

        if (!imageUpload) {
            console.log('No file selected.');
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
            console.log('Image uploaded successfully:', urlImagen);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const userData = {
            ...values,
            image: imagenAddHosting,
        };

        dispatch(updateUser(userData, token));
        setSubmitting(false);
        navigate('/myprofile');
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
            console.error('Error deleting user profile:', error);
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
                                <img width="400px" src={user.image} alt={user.image} />
                            </li>
                        </ul>
                    </div>
                )}
                <br />
                <br />
                <h4 className="text-center mb-4" style={{ border: "none" }}>
                    Tus nuevos datos
                </h4>

                <Formik
                    initialValues={{
                        userName: user ? user.userName : '',
                        password: '',
                        confirmPassword: '',
                        bio: user ? user.bio : '',
                        image: user ? user.image : '',
                        premiumFeature1: '',
                        premiumFeature2: '',
                    }}
                    validationSchema={updateUserValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, values, errors, isSubmitting }) => (
                        <Form style={{ width: "50%" }}>
                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    className={`form-control ${styles["custom-input"]} ${values.userName.length > 0 ? styles["has-content"] : ""}`}
                                />
                                <label htmlFor="userName" className={`${styles["form-label"]}`}>Nombre</label>
                            </div>
                            <ErrorMessage name="userName" component="div" className="text-danger" />
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="password"
                                    name="password"
                                    className={`form-control ${styles['custom-input']} ${values.password.length > 0 ? styles['has-content'] : ""}`}
                                />
                                <label className={`${styles['form-label']}`}>Contraseña</label>
                            </div>
                            <ErrorMessage name="password" component="div" className="text-danger" />
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-control ${styles['custom-input']} ${values.confirmPassword.length > 0 ? styles['has-content'] : ""}`}
                                />
                                <label className={`${styles['form-label']}`}>Confirma tu contraseña</label>
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="bio"
                                    className={`form-control ${styles['custom-input']} ${values.bio.length > 0 ? styles['has-content'] : ""}`}
                                />
                                <label className={`${styles['form-label']}`}>Biografía</label>
                            </div>
                            <ErrorMessage name="bio" component="div" className="text-danger" />
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="file"
                                    name="imageUpload"
                                    id="imageUpload"
                                    className="form-control"
                                    onChange={handleUploadImagen}
                                />
                                <label htmlFor="imageUpload" className={`${styles["form-label"]}`}>Subir Imagen</label>
                            </div>
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="premiumFeature1"
                                    disabled={user.planName !== 'Premium'}
                                    className={`form-control ${styles['custom-input']} ${values.premiumFeature1.length > 0 ? styles['has-content'] : ""}`}
                                />
                                <label className={`${styles['form-label']}`}>Campo Premium 1</label>
                            </div>
                            <ErrorMessage name="premiumFeature1" component="div" className="text-danger" />
                            <br />

                            <div className="mb-3 position-relative">
                                <Field
                                    type="text"
                                    name="premiumFeature2"
                                    disabled={user.planName !== 'Premium'}
                                    className={`form-control ${styles['custom-input']} ${values.premiumFeature2.length > 0 ? styles['has-content'] : ""}`}
                                />
                                <label className={`${styles['form-label']}`}>Campo Premium 2</label>
                            </div>
                            <ErrorMessage name="premiumFeature2" component="div" className="text-danger" />
                            <br />

                            <button type="submit" className="btn btn-primary" style={{ textDecoration: "none" }} disabled={isSubmitting}>
                                {isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
                            </button>
                        </Form>
                    )}
                </Formik>
                <br />
                <br />
                <button
                    className="btn btn-danger"
                    onClick={preFinishUser}
                    style={{ width: "50%", fontWeight: "bold", fontSize: "20px", textDecoration: "none" }}
                >
                    Eliminar cuenta
                </button>
                <br />
                {finish && (
                    <div>
                        <button
                            className="btn btn-danger"
                            onClick={finishUser}
                            style={{ fontWeight: "bold", fontSize: "20px", textDecoration: "none", margin: "0px 10px" }}
                        >
                            Confirmar
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={unFinish}
                            style={{ fontWeight: "bold", fontSize: "20px", textDecoration: "none", margin: "0px 10px" }}
                        >
                            Cancelar
                        </button>
                    </div>
                )}
                <br />
            </div>
        </div>
    );
};

export default UpdateUserPage;
