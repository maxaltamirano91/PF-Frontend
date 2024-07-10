import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
	// Definir el esquema de validación con Yup
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email invalido')
			.required('Se requiere un Email'),
		password: Yup.string().required('Se requiere una contraseña'),
	})

	// Función para manejar el envío del formulario
	const handleSubmit = (values, { setSubmitting }) => {
		console.log('Submitting:', values)
		setSubmitting(false)
	}

	return (
		<div className="container-fluid d-flex justify-content-center align-items-center vh-100">
			<Formik
				initialValues={{ email: '', password: '', rememberMe: true }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form
						className="p-5 border rounded shadow-sm "
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
									Olvidaste la contraseña?
								</a>
							</div>
						</div>

						<button
							type="submit"
							className="btn btn-primary btn-block mb-4"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Ingrensando...' : 'Ingresar'}
						</button>

						<div className="text-center">
							<p>
								No eres miembro?{' '}
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

export default Login
