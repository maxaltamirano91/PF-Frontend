import styles from './UsersPage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { ArrowUpAZ, ArrowDownAZ } from 'lucide-react'

const UsersPage = () => {
	const dispatch = useDispatch()
	const { allUsers } = useSelector((state) => state.users)
	const { token } = useSelector((state) => state.auth)
	const [query, setQuery] = useState({
		pagination: 15,
		search: '',
		sort: 'a-z',
	})
	const { loggedUser } = useSelector(state => state.auth)

	const handleChange = (e) => {
		setQuery((prev) => ({ ...prev, search: e.target.value }))
		dispatch(getAllUsers(query, token))
	}

	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight
		if (bottom) {
			setQuery((prev) => ({ ...prev, pagination: query.pagination + 5 }))
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		dispatch(getAllUsers(query, token))
	}, [dispatch, token, query])

	return (
		<div className={styles.usersPage}>
			<div className={styles.titleContainer}>
				<h2>Perfiles</h2>
				<div className={styles.searchbarContainer}>
					<div className={styles.sort}>
						<div onClick={() => setQuery((prev) => ({ ...prev, sort: 'a-z' }))}>
							<ArrowDownAZ size={20} />
						</div>
						<div onClick={() => setQuery((prev) => ({ ...prev, sort: 'z-a' }))}>
							<ArrowUpAZ size={20} />
						</div>
					</div>
					<input
						type="search"
						name="userName"
						value={query.search}
						className={styles.searchbar}
						onChange={handleChange}
						placeholder="Buscar..."
					/>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.cardContainer}>
					{allUsers.map((user) => (
						<div className={`${styles.card} border`} key={user.id}>
							<Link to={`/users/${user.id}`}>
								<div className={styles.imagesContainer}>
									<div className={styles.coverContainer}>
										<img
											src="../../../public/profile-background.jpg"
											alt="background"
										/>
									</div>
									<div className={styles.userCardContainer} key={user.id}>
										<div className={styles.userCard}>
											<img
												src={user.image}
												alt={user.userName}
												className={styles.userImage}
											/>
										</div>
									</div>
								</div>
								<div className={styles.userDetails}>
									<h3>{user.userName}</h3>
									<span className="text-secondary">{user.bio}</span>
									{loggedUser?.role !== 'admin' &&
									<button className="w-100 btn btn-outline-light text-dark">
										Contratar
									</button>
									}
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default UsersPage
