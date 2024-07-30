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
import styles from './UpdateUserPage.module.css'

const UpdateUserPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.loggedUser)
	const { token } = useSelector((state) => state.auth)

	const [imagenAddHosting, setImagenAddHosting] = useState('')
	const [finish, setFinish] = useState(false)
	const [formError, setFormError] = useState('')
	const [selectedPlatform, setSelectedPlatform] = useState('')
	const [linkUrl, setLinkUrl] = useState('')

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
		const url =
			'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3'

		if (!imageUpload) {
			return
		}

		const formData = new FormData()
		formData.append('image', imageUpload)

		try {
			const result = await axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			const urlImagen = result.data.data.url
			setImagenAddHosting(urlImagen)
			console.log('Imagen subida correctamente:', urlImagen)
		} catch (error) {
			console.error('Error uploading image', error)
			setFormError('Error al subir la imagen')
		}
	}

	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
		setFormError('');

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

		try {
			const result = await dispatch(updateUser(userData, token))

			if (result.status === 200) {
				navigate('/myprofile')
			} else {
				if (result.status === 400 && result.data?.message === 'Contraseña actual incorrecta') {
					setFormError('La contraseña actual es incorrecta')
					resetForm()
				} else {
					const errorMessage = result.data?.message || 'Error al actualizar el usuario'
					setFormError(`Error al actualizar el usuario: ${errorMessage}`)
				}
			}
		} catch (error) {
			console.error('Error en la actualización:', error)
			const errorMessage = error.response?.data?.message || 'Error al actualizar el usuario. Intente nuevamente más tarde.'
			setFormError(errorMessage)
			resetForm()
		} finally {
			dispatch(getUserProfile(token)) 
			setSubmitting(false)
		}
	}

	const preFinishUser = () => {
		setFinish(true)
	}

	const unFinish = () => {
		setFinish(false)
	}

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
						<Form style={{ width: '50%' }}>
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

							<div className="mb-3 position-relative">
								<Field
									type="password"
									name="currentPassword"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>
									Contraseña Actual
								</label>
								<ErrorMessage
									name="currentPassword"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3 position-relative">
								<Field
									type="password"
									name="newPassword"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>
									Nueva Contraseña
								</label>
								<ErrorMessage
									name="newPassword"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3 position-relative">
								<Field
									type="password"
									name="confirmPassword"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>
									Confirmar Contraseña
								</label>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3 position-relative">
								<Field
									type="text"
									name="bio"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>Biografía</label>
								<ErrorMessage
									name="bio"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3 position-relative">
								<Field
									type="text"
									name="aboutMe"
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>About Me</label>
								<ErrorMessage
									name="aboutMe"
									component="div"
									className="text-danger"
								/>
							</div>

							<div className="mb-3 position-relative">
								<input
									type="file"
									name="image"
									onChange={handleUploadImagen}
									className={`form-control ${styles['custom-input']}`}
								/>
								<label className={`${styles['form-label']}`}>Imagen</label>
								<ErrorMessage
									name="image"
									component="div"
									className="text-danger"
								/>
							</div>

							{user && user.planName === 'Premium' && (
								<>
									<div className="mb-3">
										<label htmlFor="platform">Plataforma:</label>
										<Field
											as="select"
											name="selectedPlatform"
											id="platform"
											className="form-control"
											onChange={(e) => {
												setSelectedPlatform(e.target.value)
												setFieldValue('selectedPlatform', e.target.value)
											}}
										>
											<option value="" label="Selecciona una plataforma" />
											{socialPlatforms.map((platform) => (
												<option key={platform.value} value={platform.value}>
													{platform.name}
												</option>
											))}
										</Field>
										<ErrorMessage
											name="selectedPlatform"
											component="div"
											className="text-danger"
										/>
									</div>
									<div className="mb-3">
										<label htmlFor="linkUrl">URL:</label>
										<Field
											type="url"
											name="linkUrl"
											id="linkUrl"
											className="form-control"
											value={linkUrl}
											onChange={(e) => {
												setLinkUrl(e.target.value)
												setFieldValue('linkUrl', e.target.value)
											}}
										/>
										<ErrorMessage
											name="linkUrl"
											component="div"
											className="text-danger"
										/>
									</div>
									<FieldArray
										name="links"
										render={(arrayHelpers) => (
											<div>
												{values.links && values.links.length > 0 ? (
													values.links.map((link, index) => (
														<div key={index} className="mb-3">
															<div>
																Plataforma: {link.name}
																<br />
																URL: {link.url}
															</div>
															<button
																type="button"
																onClick={() => arrayHelpers.remove(index)}
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
														// Agregar un nuevo enlace basado en los valores seleccionados
														if (selectedPlatform && linkUrl) {
															arrayHelpers.push({
																name: selectedPlatform,
																url: linkUrl,
															})
															setSelectedPlatform('')
															setLinkUrl('')
														} else {
															alert(
																'Selecciona una plataforma y proporciona una URL.'
															)
														}
													}}
													className="btn btn-primary mt-2"
												>
													Agregar Enlace
												</button>
											</div>
										)}
									/>
								</>
							)}

							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting}
							>
								Guardar Cambios
							</button>
						</Form>
					)}
				</Formik>

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
			</div>
		</div>
	)
}

export default UpdateUserPage
