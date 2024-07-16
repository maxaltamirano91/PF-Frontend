import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import Cards from '../../components/cards/Cards'

const HomePage = () => {
	const dispatch = useDispatch()
	const { authToken } = useSelector((state) => state.auth)
	const { allProjects } = useSelector((state) => state.project)
	const [renderingCards, setRenderingCards] = useState(5)
	const [displayPagination, setDisplayPagination] = useState(true)

	const handlePagination = () => {
		if (allProjects.length >= renderingCards) {
			setRenderingCards((prevCount) => prevCount + 5)
		} else {
			setDisplayPagination(false)
		}
	}

	useEffect(() => {
		dispatch(getAllProjects(renderingCards))
	}, [dispatch, renderingCards])

	return (
		<div className="container mt-4">
			<div className="row mb-3">
				<div className="col text-end">
					{authToken && (
						<a className="btn btn-primary" href="/create">
							Crear proyecto!
						</a>
					)}
				</div>
			</div>
			<Cards projects={allProjects} />
			{displayPagination ? (
				<div className="text-center mt-3">
					<button className="btn btn-secondary" onClick={handlePagination}>
						Ver más
					</button>
				</div>
			) : (
				<p className="text-center mt-3">Estos son todos los proyectos</p>
			)}
		</div>
	)
}

export default HomePage
