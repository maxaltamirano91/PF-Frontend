import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllUsers,
	updateUserByID,
	deleteUserById,
} from '../../redux/actions'
import EditUserModal from './EditUserModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewUsers = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const users = useSelector((state) => state.users.allUsers)

	const [showModal, setShowModal] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)

	useEffect(() => {
		dispatch(getAllUsers({pagination:9999}, token))
	}, [dispatch, token])

	const handleEdit = (user) => {
		setSelectedUser(user)
		setShowModal(true)
	}

	const handleSave = (updatedUser) => {
		dispatch(updateUserByID(updatedUser, token))
		setShowModal(false)
	}

	const handleDelete = (userId) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
			dispatch(deleteUserById(userId, token))
		}
	}

	const filteredUsers = users.filter(
		(user) =>
			user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.id.toString().includes(searchQuery)
	)

	return (
		<SectionStyled className="ListUsers">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				{filteredUsers && filteredUsers.length > 0 ? (
					filteredUsers.map((user, index) => (
						<div className="accordion-item" key={user.id}>
							<h2 className="accordion-header">
								<span
									className="accordion-button collapsed item"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#flush-collapse${index}`}
									aria-expanded="false"
									aria-controls={`flush-collapse${index}`}
								>
									<div className="d-flex justify-content-between w-100 pe-5 flex-wrap">
										<div className="name">{user.userName}</div>
										<a href={`mailto:${user.email}`}>{user.email}</a>
										<div className="id">{user.id}</div>
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse "
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body card my-2 ">
									<div className="info">
										<p>Bio: {user.bio}</p>
										<p>
											Email: <a href={`mailto:${user.email}`}>{user.email}</a>
										</p>
										<p>Password: {user.password}</p>
										<p>ID: {user.id}</p>
									</div>
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										<button
											type="button"
											className="btn btn-outline-primary mb-0"
											onClick={() => handleEdit(user)}
										>
											Editar
										</button>
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
											onClick={() => handleDelete(user.id)}
										>
											Eliminar
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay usuarios disponibles</p>
				)}
			</div>
			{selectedUser && (
				<EditUserModal
					show={showModal}
					handleClose={() => setShowModal(false)}
					user={selectedUser}
					handleSave={handleSave}
				/>
			)}
		</SectionStyled>
	)
}

export default AdminViewUsers

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
