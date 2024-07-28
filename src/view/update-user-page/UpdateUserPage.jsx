import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, logoutUser, deleteUserProfile } from "../../redux/actions";
import styles from './UpdateUserPage.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

const UpdateUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.loggedUser);
    const { token } = useSelector((state) => state.auth);

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "El nombre debe de consistir de solo letras")
            .min(2, 'El nombre es muy corto')
            .max(50, 'El nombre es muy largo'),
        password: Yup.string()
            .min(6, 'La contraseña debe de ser de al menos 6 carácteres')
            .matches(/[A-Z]/, 'La contraseña debe de contener al menos una mayúscula'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
        bio: Yup.string()
            .min(2, 'La biografía es muy corta')
            .max(50, 'La biografía es muy larga'),
        image: Yup.string()
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const userData = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value !== '')
        );

        dispatch(updateUser(userData, token));
        setSubmitting(false);
        dispatch(logoutUser());
        navigate('/login');
    };

    const [finish, setFinish] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const preFinishUser = () => setFinish(true);
    const unFinish = () => setFinish(false);

    const finishUser = () => {
        dispatch(deleteUserProfile(token));
        dispatch(logoutUser());
        navigate('/home');
    };

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardBody}>
                <div className={styles.half}>
                    {user && (
                        <div className={styles.currentData}>
                            <h4 className="text-center mb-4">Tus datos actuales</h4>
                            <ul className="list-group">
                                <li className="list-group-item"><p><strong>Nombre: </strong>{user.userName}</p></li>
                                <li className="list-group-item"><p><strong>Contraseña: </strong>{user.password}</p></li>
                                <li className="list-group-item"><p><strong>Biografía: </strong>{user.bio}</p></li>
                                <li className="list-group-item"><p><strong>Imagen: </strong>{user.image}</p></li>
                                <li className="list-group-item">
                                    <div className={styles.imageContainer}>
                                        <img className={styles.smallImage} src={user.image} alt={user.userName} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.half}>
                    <div className={styles.newData}>
                        <h4 className="text-center mb-4">Tus nuevos datos</h4>
                        <Formik
                            initialValues={{ userName: '', password: '', password2: '', bio: '', image: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, isSubmitting }) => (
                                <Form className={styles.customForm}>
                                    <div className="mb-3">
                                        <label htmlFor="userName" className={styles.formLabel}>Nombre</label>
                                        <Field
                                            type="text"
                                            name="userName"
                                            id="userName"
                                            className={`form-control ${styles.customInput} ${values.userName.length > 0 ? styles.hasContent : ""}`}
                                        />
                                        <ErrorMessage name="userName" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3 position-relative">
                                        <label htmlFor="password" className={styles.formLabel}>Contraseña</label>
                                        <div className={styles.passwordWrapper}>
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                className={`form-control ${styles.customInput} ${values.password.length > 0 ? styles.hasContent : ""}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.eyeButton}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3 position-relative">
                                        <label htmlFor="password2" className={styles.formLabel}>Repetir contraseña</label>
                                        <div className={styles.passwordWrapper}>
                                            <Field
                                                type={showPassword2 ? "text" : "password"}
                                                name="password2"
                                                id="password2"
                                                className={`form-control ${styles.customInput} ${values.password2.length > 0 ? styles.hasContent : ""}`}
                                            />
                                            <button
                                                type="button"
                                                className={styles.eyeButton}
                                                onClick={() => setShowPassword2(!showPassword2)}
                                            >
                                                {showPassword2 ? <EyeOff /> : <Eye />}
                                            </button>
                                        </div>
                                        <ErrorMessage name="password2" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="bio" className={styles.formLabel}>Biografía</label>
                                        <Field
                                            type="text"
                                            name="bio"
                                            id="bio"
                                            className={`form-control ${styles.customInput} ${values.bio.length > 0 ? styles.hasContent : ""}`}
                                        />
                                        <ErrorMessage name="bio" component="div" className="text-danger" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="image" className={styles.formLabel}>Imagen</label>
                                        <Field
                                            type="text"
                                            name="image"
                                            id="image"
                                            className={`form-control ${styles.customInput} ${values.image.length > 0 ? styles.hasContent : ""}`}
                                        />
                                        <ErrorMessage name="image" component="div" className="text-danger" />
                                    </div>

                                    <div className={styles.customButtonContainer}>
                                        <button
                                            type="submit"
                                            className={`btn btn-primary ${styles.submitButton}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <button
                            className={`btn btn-danger ${styles.deleteButton}`}
                            onClick={preFinishUser}
                        >
                            Eliminar cuenta
                        </button>

                        {finish && (
                            <div className={styles.buttonContainer}>
                                <button
                                    className={`btn btn-danger ${styles.confirmButton}`}
                                    onClick={finishUser}
                                >
                                    Confirmar
                                </button>
                                <button
                                    className={`btn btn-primary ${styles.cancelButton}`}
                                    onClick={unFinish}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserPage;
