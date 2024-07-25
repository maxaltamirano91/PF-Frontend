import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewUsers = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const users = useSelector((state) => state.users.allUsers)

	useEffect(() => {
		dispatch(getAllUsers(token))
	}, [dispatch, token])

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
										<div className="mail">{user.email}</div>
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
										<p>Email: {user.email}</p>
										<p>Password: {user.password}</p>
										<p>ID: {user.id}</p>
									</div>
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										<button
											type="button"
											className="btn btn-outline-primary mb-0"
										>
											Editar
										</button>
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
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
