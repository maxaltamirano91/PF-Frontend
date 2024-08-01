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
		console.log(users)
		dispatch(getAllUsers({ pagination: 9999 }, token))
	}, [dispatch, token])

	const handleEdit = (user) => {
		setSelectedUser(user)
		setShowModal(true)
	}

	const handleSave = (updatedUser) => {
		dispatch(updateUserByID(updatedUser, token)).then(() => {
			setShowModal(false)
			dispatch(getAllUsers({ pagination: 9999 }, token))
		})
	}

	const handleDelete = (userId) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
			dispatch(deleteUserById(userId, token)).then(() => {
				dispatch(getAllUsers({ pagination: 9999 }, token))
			})
		}
	}

	const filteredUsers = users.filter(
		(user) =>
			user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.id.toString().includes(searchQuery)
	)
	console.log(filteredUsers)
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
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse "
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body card my-2">
									<div className="content-container">
										<div className="info">
											<div className="info">
												<p>
													<strong>Bio:</strong> {user.bio}
												</p>
												<p>
													<strong>Email:</strong>{' '}
													<a href={`mailto:${user.email}`}>{user.email}</a>
												</p>
												<p>
													<strong>Password:</strong> ******
												</p>
												<p>
													<strong>Plan:</strong>{' '}
													{user.planName ? user.planName : 'Admin'}
												</p>
												<p>
													<strong>Acerca de mi:</strong> {user.aboutMe}
												</p>{' '}
												<p>
													<strong>Redes:</strong>
													{user.links.length > 0 ? (
														<ul>
															{user.links.map((l, index) => (
																<li key={index}>
																	<span>{l.name}:</span>
																	<a
																		href={l.url}
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		{l.url}
																	</a>
																</li>
															))}
														</ul>
													) : (
														<span>No hay redes sociales disponibles.</span>
													)}
												</p>
											</div>
										</div>
										<div className="image">
											<img
												src={user.image}
												alt={`${user.userName}'s profile`}
											/>
										</div>
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
	.content-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.info {
		flex: 1;
		margin-right: 20px; /* Espacio entre la info y la imagen */
	}

	.image img {
		max-width: 200px; /* Ajusta el tamaño de la imagen según sea necesario */
		height: auto;
		object-fit: cover;
	}

	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
