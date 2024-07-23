import Form from './Form'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetFetchError } from '../../redux/actions'
import { loginValidationSchema } from './validations'

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { loggedUser, fetchError, loading } = useSelector((state) => state.auth)
	const { loginWithRedirect } = useAuth0()

	const initialValues = { email: '', password: '' }

	const fields = [
		{ name: 'email', type: 'email', label: 'Email', required: true },
		{ name: 'password', type: 'password', label: 'Password', required: true },
	]

	const handleSubmit = (userData) => {
		dispatch(loginUser(userData, 'local'))
	}
	useEffect(() => {
		dispatch(resetFetchError());
		if (loggedUser) navigate('/home')
	}, [loggedUser, navigate])

	const handleAuth0Login = (e) => {
		e.preventDefault()
		loginWithRedirect()
	}


	return (
		<div className="d-flex justify-content-center align-items-center">
			<Form
				title="Log in"
				initialValues={initialValues}
				validationSchema={loginValidationSchema}
				onSubmit={handleSubmit}
				fields={fields}
				minWidth="420px"
			>
				{(formik) => (
					<>
						<div className="mb-3 d-flex justify-content-between">
							<div className="d-flex align-items-center gap-1">
								<input type="checkbox" name="rememberMe" />
								<label className="form-check-label" htmlFor="rememberMe">
									Recordarme
								</label>
							</div>
							<a href="/forgotPassword" className="text-decoration-none">
								¿Olvidaste la contraseña?
							</a>
						</div>
						{fetchError && <div className="text-danger mb-4">{fetchError}</div>}
						<button type="submit" className="m-0 btn btn-primary">
							{formik.isSubmitting || loading ? 'Ingresando...' : 'Ingresar'}
						</button>
						<p className="m-0 text-center text-secondary">
							O ingresa con otro metodo:
						</p>
						<button
							type="button"
							onClick={handleAuth0Login}
							className="w-100 m-0 btn btn-secondary"
						>
							Ingresar con otro metodo
						</button>
						<div className="text-center">
							<p>
								¿No eres miembro?{' '}
								<Link to="/register" className="text-decoration-none">
									Registrarse
								</Link>
							</p>
						</div>
					</>
				)}
			</Form>
		</div>
	)
}

export default LoginForm