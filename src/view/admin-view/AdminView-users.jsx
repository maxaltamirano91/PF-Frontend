import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewUsers = () => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const users = useSelector((state) => state.users.allUsers)

	useEffect(() => {
		dispatch(getAllUsers(token))
	}, [dispatch, token])

	const [collapsedRows, setCollapsedRows] = useState({})

	const toggleCollapse = (userId) => {
		setCollapsedRows((prev) => ({
			...prev,
			[userId]: !prev[userId],
		}))
	}

	return (
		<div>
			<table className="table ">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Nombre</th>
						<th scope="col">Email</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users && users.length > 0 ? (
						users.map((user) => (
							<>
								<tr key={user.id}>
									<th scope="row" className="align-middle">
										{user.id}
									</th>
									<td className="align-middle">{user.userName}</td>
									<td className="align-middle">{user.email}</td>
									<td className="align-middle">
										<span
											className="btn btn-primary btn-sm mx-2"
											onClick={() => toggleCollapse(user.id)}
											data-bs-toggle="collapse"
											data-bs-target={`#collapseExample${user.id}`}
											aria-expanded="false"
											aria-controls={`collapseExample${user.id}`}
										>
											Ver mas
										</span>
										<span className="btn btn-danger btn-sm">Eliminar</span>
									</td>
								</tr>
								<tr className="collapse" id={`collapseExample${user.id}`}>
									<td colSpan="4">
										<div className="card card-body">
											<p>Password: {user.password}</p>
											<p>Bio: {user.bio}</p>
										</div>
									</td>
								</tr>
							</>
						))
					) : (
						<tr>
							<td className="align-middle" colSpan="4">
								No hay usuarios disponibles
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default AdminViewUsers
