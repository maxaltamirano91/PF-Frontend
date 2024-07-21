import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getDeletedProjects,
	restoreDeletedProject,
	getUserProfile,
} from '../../redux/actions'
import Cards from '../../components/cards/Cards'
import { useNavigate } from 'react-router-dom'

const ProjectFiledPage = () => {
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.auth)
	const { deletedProjects, error } = useSelector((state) => state.projects)
	const authToken = useSelector((state) => state.auth.token)
	const navigate = useNavigate()

	useEffect(() => {
		if (token) {
			dispatch(getDeletedProjects(token))
			dispatch(getUserProfile(authToken))
		}
	}, [dispatch, token])

	const handleRestore = (id) => {
		dispatch(restoreDeletedProject(id, token))
		alert('Proyecto restaurado con éxito')
		navigate('/myprofile')
	}

	return (
		<div>
			<h1>Proyectos archivados</h1>
			<hr />
			{error && <p>Error: {error}</p>}
			{deletedProjects.length === 0 ? (
				<p>No hay proyectos archivados.</p>
			) : (
				<Cards projects={deletedProjects} onRestore={handleRestore} />
			)}
		</div>
	)
}

export default ProjectFiledPage
