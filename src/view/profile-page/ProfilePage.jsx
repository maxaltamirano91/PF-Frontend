import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/actions'
import { Link } from 'react-router-dom'
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
				<h1>Proyectos:</h1>
				<Link to="/myprofile/myfiledproj">
					<button
						className="btn btn-custom border"
						style={{ textDecoration: 'none', margin: '10px' }}
					>
						Archivados
					</button>
				</Link>
				{loggedUser && (
					<Link to="/create">
						<button
							className="btn btn-custom border"
							style={{ textDecoration: 'none', margin: '10px' }}
						>
							Crear proyecto
						</button>
					</Link>
				)}

				<Cards projects={loggedUser.projects} displayButtons={true} />
			</div>
		)
}

export default ProfilePage
