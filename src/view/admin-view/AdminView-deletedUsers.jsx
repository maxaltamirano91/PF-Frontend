import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeletedUsers, restoreUser } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewDeletedUsers = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
    
	const deletedUsers = useSelector((state) => state.users.allDeletedUsers || [])

	useEffect(() => {
		dispatch(getDeletedUsers(token))
	}, [dispatch, token])

	const handleRestore = async (userId) => {
		if (window.confirm('¿Estás seguro de que deseas restaurar este usuario?')) {
			await dispatch(restoreUser(userId, token))
			dispatch(getDeletedUsers(token))
		}
	}

	const filteredDeletedUsers = deletedUsers
		.filter((user) =>
			user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.id.toString().includes(searchQuery)
		)

	return (
		<SectionStyled className="ListUsers">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				{filteredDeletedUsers && filteredDeletedUsers.length > 0 ? (
					filteredDeletedUsers.map((deletedUser, index) => (
						<div className="accordion-item" key={deletedUser.id}>
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
										<div className="name">{deletedUser.userName}</div>
										<div className="id">{deletedUser.id}</div>
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse"
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body card my-2">
									<div className="info">
										<div className="info-content">
											<p><strong>Bio:</strong> {deletedUser.bio}</p>
											<p><strong>Email:</strong> <a href={`mailto:${deletedUser.email}`}>{deletedUser.email}</a></p>
											<p><strong>Password:</strong> ******</p>
											<p>
													<strong>Plan:</strong>{' '}
													{deletedUser.planName ? deletedUser.planName : 'Admin'}
												</p>
											<p><strong>ID:</strong> {deletedUser.id}</p>
											<p><strong>Acerca de mí:</strong> {deletedUser.aboutMe}</p>
										</div>
										<img src={deletedUser.image} alt={`${deletedUser.userName}'s profile`} className="user-image" />
									</div>
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
											onClick={() => handleRestore(deletedUser.id)}
										>
											Restaurar usuario
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay usuarios eliminados que mostrar</p>
				)}
			</div>
		</SectionStyled>
	)
}

export default AdminViewDeletedUsers

// Styles
const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}

	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.info-content {
		flex: 1;
	}

	.user-image {
		max-width: 150px; /* Ajusta el tamaño de la imagen según sea necesario */
		border-radius: 8px;
		margin-left: 20px;
	}
`
