import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Form from './Form'
import projectValidationSchema from './projectValidationSchema'
import { updateProject } from '../../redux/actions'

const UpdateProjectForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const initialValues = {
		title: '',
		description: '',
		tags: [],
		image: '',
	}

	const fields = [
		{ name: 'title', type: 'text', label: 'Título', required: true },
		{ name: 'description', type: 'text', label: 'Descripción', required: true },
		{
			name: 'tags',
			type: 'text',
			label: 'Tags (separados por comas)',
			required: false,
		},
		{ name: 'image', type: 'text', label: 'URL de la Imagen', required: true },
	]

	const handleSubmit = (projectData) => {
		projectData.tags = projectData.tags.split(',').map((tag) => tag.trim())
		dispatch(updateProject(projectData))
		navigate('/projects')
	}

	return (
		<div className="d-flex justify-content-center align-items-center">
			<Form
				title="Crear Proyecto"
				initialValues={initialValues}
				validationSchema={projectValidationSchema}
				onSubmit={handleSubmit}
				fields={fields}
				minWidth="420px"
				maxWidth="800px"
			>
				{() => (
					<>
						<button type="submit" className="m-0 btn btn-primary">
							Crear Proyecto
						</button>
					</>
				)}
			</Form>
		</div>
	)
}

export default UpdateProjectForm
