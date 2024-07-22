import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import Cards from '../../components/cards/Cards'

const HomePage = () => {
	const dispatch = useDispatch()
	const { allProjects } = useSelector((state) => state.projects)
	const [renderingCards, setRenderingCards] = useState(10)
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
		<div>
			<Cards projects={allProjects} />
			<div className="mb-5 text-center">
				{allProjects &&
					(displayPagination ? (
						<button onClick={handlePagination}>Ver más</button>
					) : (
						<p>Estos son todos los proyectos</p>
					))}
			</div>
		</div>
	)
}

export default HomePage
