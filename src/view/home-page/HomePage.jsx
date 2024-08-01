import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects, toggleProjectLike } from '../../redux/actions'
import Filter from '../../components/filter/Filter'
import Cards from '../../components/cards/Cards'
import ProFooter from '../../components/pro-footer/ProFooter'

const HomePage = () => {
	const dispatch = useDispatch()
	const { allProjects } = useSelector((state) => state.projects)
	const { loggedUser, token } = useSelector((state) => state.auth)
	const [loading, setLoading] = useState(true)
	const [searchParams, setSearchParams] = useState({
		pagination: 15,
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
			setLoading(true)
			setTimeout(() => {
				setSearchParams((prev) => ({
					...prev,
					pagination: prev.pagination + 5,
				}))
				setLoading(false)
			}, 750)
		}
	}

	const toggleLike = (project) => {
		if (loggedUser && project) {
			dispatch(
				toggleProjectLike(
					{ projectId: project.id, userId: loggedUser.id },
					searchParams,
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
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		dispatch(getAllProjects(searchParams, token))
	}, [dispatch, searchParams])

	return (
		<div className='mb-5'>
			<div className="mx-auto">
				<Filter updateSearchParams={updateSearchParams} />
				<hr className="m-0" />
				<Cards projects={allProjects} toggleLike={toggleLike} />
			</div>
			<ProFooter loading={loading}></ProFooter>
		</div>
	)
}

export default HomePage
