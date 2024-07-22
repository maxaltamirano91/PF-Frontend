import * as Yup from 'yup'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/actions'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoginButton from '../../components/loggin-button/LoginButton'

const LoginPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { loggedUser } = useSelector((state) => state.auth)
	const { fetchError } = useSelector((state) => state.requests)

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email inválido')
			.required('Se requiere un Email'),
		password: Yup.string().required('Se requiere una contraseña'),
	})

	const handleSubmit = async (userData) => {
		dispatch(loginUser(userData, 'local'))
	}

	useEffect(() => {
		if (loggedUser) navigate('/home')
	}, [loggedUser])

	return (
		<div className="container-fluid d-flex justify-content-center align-items-center vh-100">
			<Formik
				initialValues={{ email: '', password: '', rememberMe: true }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, errors }) => (
					<Form
						className="p-5 border rounded shadow-sm"
						style={{ maxWidth: '400px' }}
					>
						<div className="form-outline mb-4">
							<Field
								type="email"
								id="email"
								name="email"
								className="form-control"
								placeholder="Email"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="form-outline mb-4">
							<Field
								type="password"
								id="password"
								name="password"
								className="form-control"
								placeholder="Contraseña"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="row mb-4">
							<div className="col d-flex align-items-center">
								<Field
									type="checkbox"
									id="rememberMe"
									name="rememberMe"
									className="form-check-input"
								/>
								<label className="form-check-label" htmlFor="rememberMe">
									{' '}
									Recordarme{' '}
								</label>
							</div>

							<div className="col text-end">
								<a href="/forgotPassword" className="text-decoration-none">
									¿Olvidaste la contraseña?
								</a>
							</div>
						</div>

						{errors.submit && (
							<div className="text-danger mb-4">{errors.submit}</div>
						)}
						{fetchError && fetchError.includes('Credenciales inválidas') && (
							<div className="text-danger mb-4">{fetchError}</div>
						)}
						<button
							type="submit"
							className="btn btn-primary btn-block mb-4"
							disabled={isSubmitting}
							onClick={handleSubmit}
						>
							{isSubmitting ? 'Ingresando...' : 'Ingresar'}
						</button>

						<div className="text-center">
							<p>O ingresa con otro metodo:</p>
							<LoginButton />
						</div>

						<div className="text-center">
							<p>
								¿No eres miembro?{' '}
								<a href="/register" className="text-decoration-none">
									Registrarse
								</a>
							</p>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default LoginPage
