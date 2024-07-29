import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, logoutUser, deleteUserProfile } from "../../redux/actions";
import styles from './UpdateUserPage.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const UpdateUserPage = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const user = useSelector((state)=>state.auth.loggedUser)
const { token } = useSelector((state)=>state.auth)
console.log(user)

const validationSchema = Yup.object().shape({
    userName:Yup.string()
    .matches(/^[A-Za-z\s]+$/, "El nombre debe de consistir de solo letras")
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo'),
    password:Yup.string()
    .min(6, 'La contraseña debe de ser de al menos 6 carácteres')
    .matches(/[A-Z]/, 'La contraseña debe de contener al menos una mayúscula'),
    password2: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    bio:Yup.string()
    .min(2, 'La biografía es muy corta')
    .max(50, 'La biografía es muy larga'),
    image:Yup.string()
})

const handleSubmit = async(values, {setSubmitting}) => {
    const userData = Object.fromEntries(
    Object.entries(values).filter(([key, value]) => value !== '')
    )

    dispatch(updateUser(userData, token))
    setSubmitting(false)
    dispatch(logoutUser())
    navigate('/login')
    
}

const [finish, setFinish] = useState(false)
const preFinishUser = () => {
    setFinish(true)
}

const unFinish = () => {
    setFinish(false)
}

const finishUser = () => {
    dispatch(deleteUserProfile(token))

    dispatch(logoutUser())
    navigate('/home')
}

return (
    <div className="row justify-content-center">
        
        <div className={[styles.centerDiv]}>
            {user?<div style={{width:"100%"}}>
            <h4 className="text-center mb-4" style={{border:"none"}}>Tus datos actuales</h4>
            <ul className="list-group">
                <li className="list-group-item" style={{border:"none"}}> <p style={{display:"inline", fontWeight:"bold"}}>Nombre: </p> {`${user.userName}`}</li>
                <li className="list-group-item" style={{border:"none"}}> <p style={{display:"inline", fontWeight:"bold"}}>Contraseña:</p> {`${user.password}`}</li>
                <li className="list-group-item" style={{border:"none"}}> <p style={{display:"inline", fontWeight:"bold"}}>Biografía: </p> {`${user.bio}`}</li>
                <li className="list-group-item" style={{border:"none"}}> <p style={{display:"inline", fontWeight:"bold"}}>Imagen: </p> {`${user.image}`}</li>
                <li className="list-group-item" style={{border:"none"}}> <img width="400px" src={`${user.image}`} alt={`${user.image}`} /> </li>
            </ul></div>
            :null} <br /><br />
            <br />
            <h4 className="text-center mb-4" style={{border:"none"}}>Tus nuevos datos</h4> 

        <Formik
        initialValues={{ userName: '', password: '', password2:'', bio:'', image: ''}}              
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
        {({ values, isSubmitting }) => (
            <Form style={{width:"50%"}}>

                <div className="mb-3 position-relative">
                <Field type="text" name="userName" id="userName" key="userName"
                  className={`form-control ${styles["custom-input"]} ${values.userName.length > 0 ? styles["has-content"] : ""}`}
                />
                <label htmlFor="userName" className={`${styles["form-label"]}`}> Nombre </label>
                </div>
                <ErrorMessage name="userName" component="div" className="text-danger" />
                <br />

                <div className="mb-3 position-relative">
                <Field type="password" key='password' name="password"
                className={`form-control ${styles['custom-input']} ${values.password.length > 0 ? styles['has-content'] : ""}`}
                />
                <label className={`${styles['form-label']}`}>Contraseña</label>
                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
                <br />

                <div className="mb-3 position-relative">
                <Field type="password" key='password2' name="password2"
                className={`form-control ${styles['custom-input']} ${values.password2.length > 0 ? styles['has-content'] : ""}`}
                />
                <label className={`${styles['form-label']}`}>Repetir contraseña</label>
                </div>
                <ErrorMessage name="password2" component="div" className="text-danger" />
                <br />

                <div className="mb-3 position-relative">
                <Field type="text" key='bio' name="bio"
                className={`form-control ${styles['custom-input']} ${values.bio.length > 0 ? styles['has-content'] : ""}`}
                />
                <label className={`${styles['form-label']}`}>Biografía</label>
                </div>
                <ErrorMessage name="bio" component="div" className="text-danger" />
                <br />

                <div className="mb-3 position-relative">
                <Field type="text" key='image' name="image"
                className={`form-control ${styles['custom-input']} ${values.image.length > 0 ? styles['has-content'] : ""}`}
                />
                <label className={`${styles['form-label']}`}>Imagen</label>
                </div>
                <ErrorMessage name="image" component="div" className="text-danger" />
                <br />

                <button type="submit" className="btn btn-primary" style={{textDecoration:"none"}} disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
                </button>

                </Form>)}
                </Formik>
                <br /><br />
                <button className="btn btn-danger" onClick={preFinishUser} style={{width:"50%", fontWeight:"bold", fontSize:"20px", textDecoration:"none"}}>
                    Eliminar cuenta
                </button> <br />
                {finish ? <div>
                <button className="btn btn-danger" onClick={finishUser} style={{fontWeight:"bold", fontSize:"20px", textDecoration:"none", margin:"0px 10px"}}>
                    Confirmar
                </button>

                <button className="btn btn-primary" onClick={unFinish} style={{fontWeight:"bold", fontSize:"20px", textDecoration:"none", margin:"0px 10px"}}>
                    Cancelar
                </button>
                </div> : null}
                <br />

                    </div>
    </div>
);
};

export default UpdateUserPage;