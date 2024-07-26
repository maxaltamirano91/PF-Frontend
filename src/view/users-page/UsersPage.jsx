import styles from './UsersPage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import { Link } from 'react-router-dom'

const UsersPage = () => {
	const dispatch = useDispatch()
	const { allUsers } = useSelector((state) => state.users)
	const { token } = useSelector((state) => state.auth)

	const [sortBy, setSortBy] = useState('userName')
	const [sortDirection, setSortDirection] = useState('asc')

	useEffect(() => {
		if (token) {
			dispatch(getAllUsers(token))
		}
	}, [dispatch, token])

	const handleSort = (field) => {
		if (field === sortBy) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(field)
			setSortDirection('asc')
		}
	}

	const sortedUsers = [...allUsers].sort((a, b) => {
		const nameA = a[sortBy].toUpperCase()
		const nameB = b[sortBy].toUpperCase()

		if (sortDirection === 'asc') {
			return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
		} else {
			return nameA > nameB ? -1 : nameA < nameB ? 1 : 0
		}
	})

	return (
		<div className={styles.UsersPage}>
			<h1>Lista de Usuarios</h1>
			<div>
				<button onClick={() => handleSort('userName')}>
					Nombre{' '}
					{sortBy === 'userName' && (sortDirection === 'asc' ? '▲' : '▼')}
				</button>
			</div>
			<div className={styles.cardContainer}>
				{sortedUsers.map((user) => (
					<Link to={`/users/${user.id}`}>
						<div className={styles.userCard} key={user.id}>
							<img
								src={user.image}
								alt={user.userName}
								className={styles.userImage}
							/>
							<div className={styles.userDetails}>
								<h3>{user.userName}</h3>
								<p>{user.email}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default UsersPage
