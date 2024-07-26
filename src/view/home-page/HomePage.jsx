import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects, toggleProjectLike } from '../../redux/actions'
import Filter from '../../components/filter/Filter'
import Cards from '../../components/cards/Cards'

const HomePage = () => {
	const dispatch = useDispatch()
	const { allProjects } = useSelector((state) => state.projects)
	const { loggedUser, token } = useSelector((state) => state.auth)
	const [renderingCards, setRenderingCards] = useState(15)
	const [searchParams, setSearchParams] = useState({
		title: '',
		tags: '',
		technologies: '',
		sort: 'new',
	})

	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight
		if (bottom) {
			setRenderingCards((prevCount) => prevCount + 5)
		}
	}

	const toggleLike = (project) => {
		if (loggedUser && project) {
			dispatch(
				toggleProjectLike(
					{ projectId: project.id, userId: loggedUser.id },
					{ pagination: renderingCards, ...searchParams },
					token
				)
			)
		}
	}

	const updateSearchParams = (newParams) => {
		setSearchParams((prevParams) => ({
			...prevParams,
			...newParams,
		}))
		setRenderingCards(15)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		dispatch(getAllProjects({ pagination: renderingCards, ...searchParams }, token))
	}, [dispatch, renderingCards, searchParams])

	return (
		<div className="mx-auto">
			<Filter updateSearchParams={updateSearchParams} />
			<Cards projects={allProjects} toggleLike={toggleLike} />
		</div>
	)
}

export default HomePage
