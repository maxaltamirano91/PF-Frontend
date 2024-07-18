import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/actions'
import Cards from '../../components/cards/Cards'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const { token, loggedUser } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getUserProfile(token))
	}, [])

	if (!loggedUser) return <div>Loading ...</div>

	if (loggedUser)
		return (
			<div>
				<img src={loggedUser.image} alt={loggedUser.userName} />
				<h2>{loggedUser.userName}</h2>
				<p>{loggedUser.email}</p>
				<hr />
				<Cards projects={loggedUser.projects} displayButtons={true} />
			</div>
		)
}

export default ProfilePage
