import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UpdateUserForm from '../../components/forms/UpdateUserForm'
import { deleteUserProfile, logoutUser } from '../../redux/actions'

const UpdateUserPag = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { loggedUser, token } = useSelector((state) => state.auth)

	const handleClick = async () => {
		const confirm = window.confirm(
			'¿Deseas eliminar tu cuenta? Esta acción no se podrá revertir'
		)
		if (confirm) {
			dispatch(deleteUserProfile(token))
			dispatch(logoutUser())
			navigate('/home')
		}
	}

	return (
		<div className="w-100 h-100 d-flex justify-content-center align-items-center">
			<UpdateUserForm profileData={loggedUser} />
			<div className="text-center mt-4">
				<button className="btn btn-danger" onClick={handleClick}>
					Eliminar Perfil
				</button>
			</div>
		</div>
	)
}
export default UpdateUserPag
