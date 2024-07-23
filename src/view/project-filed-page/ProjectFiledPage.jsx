import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getDeletedProjects,
	restoreDeletedProject,
	getUserProfile,
} from '../../redux/actions'
import Cards from '../../components/cards/Cards'
import { useNavigate } from 'react-router-dom'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

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
		Toastify({
			text: 'Proyecto restaurado',
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'center',
			backgroundColor: '#4CAF50',
			stopOnFocus: true,
		}).showToast()
	}
	setTimeout(() => {
		navigate('/myprofile')
	}, 3000)

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
