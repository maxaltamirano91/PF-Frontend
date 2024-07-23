import { useFormik } from 'formik'

const Form = ({
	title,
	initialValues,
	validationSchema,
	onSubmit,
	fields,
	minWidth,
	maxWidth,
	children,
	aditionalContent
}) => {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	})

	return (
		<div
			className="p-5 d-flex flex-row justify-content-center gap-5 border rounded shadow-sm"
			style={{ minWidth, maxWidth }}
		>
			<div className="w-100">
				{title && <h3 className="mb-4">{title}</h3>}
				<form
					onSubmit={formik.handleSubmit}
					className="d-flex flex-column justify-content-center gap-3"
				>
					{fields.map((field) => (
						<div key={field.name}>
							<label htmlFor={field.name} className="form-label">
								{field.label}
							</label>
							<input
								id={field.name}
								type={field.type}
								name={field.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values[field.name]}
								className={`form-control ${
									formik.touched[field.name] && formik.errors[field.name]
										? 'is-invalid'
										: ''
								}`}
							/>
							{formik.touched[field.name] && formik.errors[field.name] ? (
								<div className="invalid-feedback">
									{formik.errors[field.name]}
								</div>
							) : null}
						</div>
					))}
					{children(formik)}
				</form>
			</div>
			{aditionalContent}
		</div>
	)
}

export default Form
