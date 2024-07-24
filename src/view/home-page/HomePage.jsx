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
	console.log(loggedUser);
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
		dispatch(getAllProjects(renderingCards))
	}, [dispatch, renderingCards])

	return (
		<div className='mx-auto'>
			<Filter />
			<Cards projects={allProjects} />
		</div>
	)
}

export default HomePage
