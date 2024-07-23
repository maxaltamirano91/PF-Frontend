import Form from './Form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/actions'
import { signupValidationSchema } from './validations'


const SignupForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const initialValues = {
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: false,
	}

	const fields = [
		{
			name: 'userName',
			type: 'text',
			label: 'Nombre de usuario',
			icon: 'fas fa-user fa-lg me-3 fa-fw',
		},
		{
			name: 'email',
			type: 'email',
			label: 'Email',
			icon: 'fas fa-envelope fa-lg me-3 fa-fw',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Contraseña',
			icon: 'fas fa-lock fa-lg me-3 fa-fw',
		},
		{
			name: 'confirmPassword',
			type: 'password',
			label: 'Repite la contraseña',
			icon: 'fas fa-key fa-lg me-3 fa-fw',
		},
	]

	const handleSubmit = async (userData, { setSubmitting }) => {
		dispatch(registerUser(userData))
		setSubmitting(false)
		navigate('/login')
	}

	return (
		<Form
			title="Sign up"
			initialValues={initialValues}
			validationSchema={signupValidationSchema}
			onSubmit={handleSubmit}
			fields={fields}
			maxWidth="1400px"
			aditionalContent={
				<div className="d-flex flex-content-center align-center">
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
						className="img-fluid"
						alt="Sample image"
					/>
				</div>
			}
		>
			{(formik) => (
				<>
					<div className="mb-3">
						<div className="mt-3 d-flex align-items-center gap-1">
							<input
								type="checkbox"
								name="terms"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								checked={formik.values.terms}
							/>
							<label className="form-check-label" htmlFor="terms">
								Estoy de acuerdo con todas las declaraciones en{' '}
								<Link to="#!">Términos de servicios</Link>
							</label>
						</div>
						{formik.touched.terms && formik.errors.terms ? (
							<div
								style={{
									width: '100%',
									marginTop: '.25rem',
									fontSize: '.875em',
									color: 'var(--bs-form-invalid-color)',
								}}
							>
								{formik.errors.terms}
							</div>
						) : null}
					</div>
					<button type="submit" className="m-0 btn btn-primary">
						Registrar
					</button>
				</>
			)}
		</Form>
	)
}

export default SignupForm
