import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    updateUser,
    deleteUserProfile,
    logoutUser,
    getUserProfile,
} from '../../redux/actions'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './UpdateUserPage.module.css'

const UpdateUserPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.loggedUser)
    const { token } = useSelector((state) => state.auth)

    const [imagenAddHosting, setImagenAddHosting] = useState('')
    const [finish, setFinish] = useState(false)
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token))
        }
    }, [dispatch, token])

    useEffect(() => {
        if (user) {
            setImagenAddHosting(user.image || '')
        }
    }, [user])

    const handleUploadImagen = async (e) => {
        const imageUpload = e.target.files[0]
        const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3'

        if (!imageUpload) return

        const formData = new FormData()
        formData.append('image', imageUpload)

        try {
            const result = await axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setImagenAddHosting(result.data.data.url)
            console.log('Imagen subida correctamente:', result.data.data.url)
        } catch (error) {
            console.error('Error uploading image', error)
            setFormError('Error al subir la imagen')
        }
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setFormError('')

        console.log(values)
		const userData = {
			...values,
			image: imagenAddHosting || user.image,
			links: values.links
				.filter((link) => link.name && link.url)
				.map((link) => ({
					...link,
					userId: user.id,
				})),
		}
        console.log(userData)

        try {
            const result = await dispatch(updateUser(userData, token))

            if (result.status === 200) {
                navigate('/myprofile')
            } else {
                if (result.status === 400 && result.data?.message === 'Contraseña actual incorrecta') {
                    setFormError('La contraseña actual es incorrecta')
                    resetForm()
                } else {
                    setFormError(`Error al actualizar el usuario: ${result.data?.message || 'Error desconocido'}`)
                }
            }
        } catch (error) {
            console.error('Error en la actualización:', error)
            setFormError(error.response?.data?.message || 'Error al actualizar el usuario. Intente nuevamente más tarde.')
            resetForm()
        } finally {
            dispatch(getUserProfile(token))
            setSubmitting(false)
        }
    }

    const preFinishUser = () => setFinish(true)

    const unFinish = () => setFinish(false)

    const finishUser = async () => {
        try {
            await dispatch(deleteUserProfile(token))
            dispatch(logoutUser())
            navigate('/home')
        } catch (error) {
            console.error('Error deleting user profile', error)
            setFormError('Error al eliminar el perfil')
        }
    }

    const socialPlatforms = [
        { name: 'GitHub', value: 'github' },
        { name: 'LinkedIn', value: 'linkedin' },
        { name: 'YouTube', value: 'youtube' },
        { name: 'Facebook', value: 'facebook' },
        { name: 'Twitter', value: 'twitter' },
        { name: 'Google', value: 'google' },
    ]

	return (
		<div className="row justify-content-center">
			<div className={styles.centerDiv}>
            <br />
				{user && (
					<div style={{ width: '100%' }}>
						<h4 className="text-center mb-4" style={{ border: 'none' }}>
							Tus datos actuales
						</h4>
						<ul className="list-group">
							<li className="list-group-item" style={{ border: 'none' }}>
								<p style={{ display: 'inline', fontWeight: 'bold' }}>
									Nombre:{' '}
								</p>{' '}
								{user.userName}
							</li>
							<li className="list-group-item" style={{ border: 'none' }}>
								<p style={{ display: 'inline', fontWeight: 'bold' }}>
									Contraseña: ******
								</p>
							</li>
							<li className="list-group-item" style={{ border: 'none' }}>
								<p style={{ display: 'inline', fontWeight: 'bold' }}>
									Biografía:{' '}
								</p>{' '}
								{user.bio}
							</li>
							<li className="list-group-item" style={{ border: 'none' }}>
								<img width="400px" src={user.image} alt="User" />
							</li>
							<li className="list-group-item" style={{ border: 'none' }}>
								<p style={{ display: 'inline', fontWeight: 'bold' }}>
									About me:{' '}
								</p>{' '}
								{user.aboutMe}
							</li>
						</ul>
					</div>
				)}
				<br />
				<br />
				<h4 className="text-center mb-4" style={{ border: 'none' }}>
					Tus nuevos datos
				</h4>

                                        <div className="form-group">
                                            <Field
                                                type="password"
                                                name="currentPassword"
                                                id="currentPassword"
                                                className="form-control"
                                            />
                                            <label htmlFor="currentPassword">Contraseña Actual</label>
                                            <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                                        </div>

				<Formik
					initialValues={{
						userName: user ? user.userName : '',
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
						bio: user ? user.bio : '',
						aboutMe: user ? user.aboutMe : '',
						image: '',
						links: user ? user.links : [],
					}}
					validationSchema={Yup.object({
						userName: Yup.string().required('Requerido'),
						currentPassword: Yup.string().required('Requerido'),
						newPassword: Yup.string().min(
							6,
							'Debe tener al menos 6 caracteres'
						),
						confirmPassword: Yup.string().oneOf(
							[Yup.ref('newPassword'), null],
							'Las contraseñas deben coincidir'
						),
						bio: Yup.string(),
						aboutMe: Yup.string().max(
							5000,
							'El About Me debe tener hasta 5000 caracteres'
						),
						image: Yup.string(),
						links: Yup.array()
							.of(
								Yup.object().shape({
									name: Yup.string().required('Requerido'),
									url: Yup.string()
										.url('Debe ser una URL válida')
										.required('Requerido'),
								})
							)
							.nullable()
							.optional(),
					})}
					onSubmit={handleSubmit}
                    
				>
					{({ isSubmitting, values, setFieldValue }) => (
                        <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }} >
						<Form style={{ width: '50%', display:'flex', flexDirection:'column' }}>
							<div className="mb-3 position-relative">
								<Field
									type="text"
									name="userName"
									id="userName"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label htmlFor="userName" className={`${styles['form-label']}`}>
									Nombre
								</label>
								<ErrorMessage
									name="userName"
									component="div"
									className="text-danger"
								/>
							</div>

                                        <div className="form-group">
                                            <Field
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                className="form-control"
                                            />
                                            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <Field
                                                type="text"
                                                name="bio"
                                                id="bio"
                                                className="form-control"
                                            />
                                            <label htmlFor="bio">Biografía</label>
                                            <ErrorMessage name="bio" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <Field
                                                type="text"
                                                name="aboutMe"
                                                id="aboutMe"
                                                className="form-control"
                                            />
                                            <label htmlFor="aboutMe">Sobre mí</label>
                                            <ErrorMessage name="aboutMe" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handleUploadImagen}
                                            />
                                            {imagenAddHosting && (
                                                <img src={imagenAddHosting} alt="Imagen previa" width="100" />
                                            )}
                                        </div>

                                        <FieldArray name="links">
                                            {({ push, remove }) => (
                                                <div>
                                                    <h5>Redes Sociales</h5>
                                                    {values.links.map((link, index) => (
                                                        <div key={index} className="form-group">
                                                            <Field
                                                                as="select"
                                                                name={`links[${index}].name`}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    setFieldValue(`links[${index}].name`, e.target.value)
                                                                }}
                                                            >
                                                                <option value="">Selecciona una plataforma</option>
                                                                {socialPlatforms.map((platform) => (
                                                                    <option key={platform.value} value={platform.value}>
                                                                        {platform.name}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                            <ErrorMessage name={`links[${index}].name`} component="div" className="text-danger" />

                                                            <Field
                                                                type="url"
                                                                name={`links[${index}].url`}
                                                                className="form-control"
                                                                placeholder="URL"
                                                            />
                                                            <ErrorMessage name={`links[${index}].url`} component="div" className="text-danger" />

                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="btn btn-danger mt-2"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        onClick={() => push({ name: '', url: '' })}
                                                        className="btn btn-primary mt-3"
                                                    >
                                                        Añadir Enlace
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>

							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting}
							>
								Guardar Cambios
							</button>
                        <br />
                        <button className="btn btn-danger" onClick={preFinishUser}>
                            Eliminar Perfil
                        </button>
                        {finish && (
                            <div className="alert alert-danger mt-3" role="alert">
                                <p>¿Estás seguro de que deseas eliminar tu perfil?</p>
                                <button className="btn btn-danger" onClick={finishUser}>
                                    Sí, eliminar
                                </button>
                                <button className="btn btn-secondary" onClick={unFinish}>
                                    Cancelar
                                </button>
                            </div>
                        )}
						</Form>
                        </div>
					)}
				</Formik>

			</div>
		</div>
	)
}

export default UpdateUserPage
