import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import Filter from '../../components/filter/Filter'
import Cards from '../../components/cards/Cards'

const HomePage = () => {
	const dispatch = useDispatch()
	const { allProjects } = useSelector((state) => state.projects)
	const [renderingCards, setRenderingCards] = useState(15)
	const loggedUser = useSelector((state) => state.auth.loggedUser);
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

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		dispatch(
			getAllProjects(
				renderingCards,
				searchParams.title,
				searchParams.tags,
				searchParams.technologies,
				searchParams.sort
			)
		)
	}, [dispatch, renderingCards, searchParams])

	const updateSearchParams = (newParams) => {
		setSearchParams((prevParams) => ({
			...prevParams,
			...newParams,
		}))
		setRenderingCards(15) // Reset renderingCards to initial value when search parameters change
	}

	return (
		<div className="mx-auto">
			<Filter updateSearchParams={updateSearchParams} />
			<Cards projects={allProjects} />
		</div>
	)
}

export default HomePage
