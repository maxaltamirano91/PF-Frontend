import styles from './UsersPage.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpAZ, ArrowDownAZ } from 'lucide-react'
import ProFooter from '../../components/pro-footer/ProFooter'

const UsersPage = () => {
	const dispatch = useDispatch()
	const { allUsers } = useSelector((state) => state.users)
	const { theme } = useSelector((state) => state.themes)
	const { token } = useSelector((state) => state.auth)
	const [query, setQuery] = useState({
		pagination: 15,
		search: '',
		sort: 'a-z',
	})
	const [loading, setLoading] = useState(true)
	const { loggedUser } = useSelector((state) => state.auth)
	const navigate = useNavigate()
	console.log(loggedUser)
	const handleChange = (e) => {
		setQuery((prev) => ({ ...prev, search: e.target.value }))
		dispatch(getAllUsers(query, token))
	}
	console.log(allUsers)

	const handleScroll = () => {
		const bottom =
		Math.ceil(window.innerHeight + window.scrollY) >=
		document.documentElement.scrollHeight
		if (bottom) {
			setTimeout(() => {
				setLoading(true)
				setQuery((prev) => ({ ...prev, pagination: query.pagination + 5 }))
				setLoading(false)
			}, 750)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		dispatch(getAllUsers(query, token))
	}, [dispatch, token, query])

	const handleContract = (userId) => {
		navigate(`/users/${userId}`, { state: { showModal: true } })
	}

	const filteredUsers = allUsers.filter((user) => user.id !== loggedUser.id)

	return (
			<div>
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
					{filteredUsers.map((user) => (
						<div
							className={`${styles.card}`}
							key={user.id}
							style={
								theme === 'light'
									? { backgroundColor: 'white', border: '1px solid #ced4da' }
									: { backgroundColor: '#212529', border: '1px solid #adb5bd' }
							}
						>
							<Link to={`/users/${user.id}`}>
								<div className={styles.imagesContainer}>
									<div className={styles.coverContainer}>
										<img
											src="../../../public/profile-background.jpg"
											alt="background"
										/>
									</div>
									<div
										className={styles.userCardContainer}
										key={user.id}
										style={
											theme === 'light'
												? {
														border: '2px solid #fff',
														boxShadow: '0 1px 5px rgba(25, 25, 25, 0.15)',
												}
												: {
														border: '2px solid #adb5bd',
														boxShadow: '0 1px 5px rgba(255, 255, 255, 0.15)',
												}
										}
									>
										<div className={styles.userCard}>
											<img
												src={user.image}
												alt={user.userName}
												style={
													theme === 'light'
														? { backgroundColor: '#fff' }
														: { backgroundColor: '#000' }
												}
											/>
										</div>
									</div>
								</div>
								<div
									className={`${styles.userDetails} ${
										theme === 'dark' && styles.userDetailsDark
									}`}
								>
									<h3>{user.userName}</h3>
									<span className="text-secondary">{user.bio}</span>
									{loggedUser?.role !== 'admin' && loggedUser?.planName !== 'Free' && user?.role !== 'admin' && (
										<button
											className={`w-100 btn ${
												theme === 'light'
													? 'border btn-outline-light text-dark'
													: 'border btn-outline-dark text-light'
											}`}
											onClick={(e) => {
												e.preventDefault()
												handleContract(user.id)
											}}
										>
											Contratar
										</button>
									)}
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
			</div>
			<ProFooter loading={loading}></ProFooter>
		</div>
	)
}

export default UsersPage
