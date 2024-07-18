import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/actions'
import Cards from '../../components/cards/Cards'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const { user, isAuthenticated, isLoading } = useAuth0()
	const { token, loggedUser } = useSelector((state) => state.auth)
	console.log(loggedUser.userName)

	useEffect(() => {
		dispatch(getUserProfile(token))
	}, [])

	if (isLoading && !loggedUser) return <div>Loading ...</div>

	if (isAuthenticated)
		return (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<hr />
			</div>
		)

	if (loggedUser)
		return (
			<div>
				<h2>hola User</h2>

				<img src={loggedUser.image} alt={loggedUser.userName} />
				<h2>{loggedUser.userName}</h2>
				<p>{loggedUser.email}</p>
				<hr />
				<Cards projects={loggedUser.projects} displayButtons={true} />
			</div>
		)
}

export default ProfilePage
