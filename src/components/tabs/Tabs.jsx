import { useEffect, useState } from 'react'
import styles from './Tabs.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Reviews from '../reviews/Reviews'
import PropTypes from 'prop-types'
import ContractView from '../../view/profile-page/components/ContractView'
import ProfileProjects from '../../components/profile-projects/ProfileProjects'

const Tabs = ({
	profileData,
	onRestore,
	deletedProjects,
	searchQuery,
	activeContractTab,
	handleReviewFormSubmit,
	handleDelete,
	onClick, // Nueva prop para manejar clics en pestañas
	activeTab, // Nueva prop para la pestaña activa
}) => {
	const { loggedUser } = useSelector((state) => state.auth)
	const [archivedProjects, setArchivedProjects] = useState(deletedProjects)

	useEffect(() => {
		setArchivedProjects(deletedProjects)
	}, [deletedProjects])

	const categories = Object.freeze({
		contracts: 'contracts',
	})

	const tabs = [
		{
			key: 'projects',
			label: 'Proyectos',
			content: (
				<ProfileProjects tabName="Proyectos" profileData={profileData} />
			),
		},
		{
			key: 'reviews',
			label: 'Reviews',
			content: (
				<Reviews
					profileData={profileData}
					handleReviewFormSubmit={handleReviewFormSubmit}
					handleDelete={handleDelete}
				/>
			),
		},
	]

	// Solo agregar la pestaña de contratos si el usuario actual es el propietario del perfil
	if (loggedUser?.id === profileData?.id) {
		tabs.push({
			key: 'contracts',
			label: 'Contratos',
			content: (
				<ContractView
					searchQuery={searchQuery}
					activeContractTab={activeContractTab}
					categories={categories}
				/>
			),
		})

		// Agregar la pestaña de archivados solo si el usuario actual es el propietario del perfil
		const modifiedProfileData = { ...profileData, projects: archivedProjects }
		tabs.push({
			key: 'archived',
			label: 'Archivados',
			content: (
				<ProfileProjects
					tabName="Proyectos Archivados"
					profileData={modifiedProfileData}
					onRestore={onRestore}
				/>
			),
		})
	}

	return (
		<div className={styles.tabsContainer}>
			<ul className={styles.tabs}>
				{tabs.map((tab) => (
					<li
						key={tab.key}
						className={`${styles.tab} ${
							activeTab === tab.key ? 'bg-dark text-light' : ''
						}`}
						onClick={() => onClick(tab.key)} // Actualiza la URL y el estado de la pestaña activa
					>
						<a>{tab.label}</a>
					</li>
				))}
			</ul>
			<div className={styles.tabContent}>
				{tabs.map(
					(tab) =>
						activeTab === tab.key && (
							<div key={tab.key} className={styles.projectsContainer}>
								<div className={styles.titleContainer}>
									<h2>{tab.label}</h2>
									<div></div>
									{loggedUser.id === profileData?.id &&
										profileData?.planName !== 'Premium' &&
										profileData?.role !== 'admin' && (
											<Link to="/subscription" className={`${styles.button}`}>
												<button className="btn btn-light border">
													Actualizar a PRO
												</button>
											</Link>
										)}
								</div>
								{tab.content}
							</div>
						)
				)}
			</div>
		</div>
	)
}

Tabs.propTypes = {
	profileData: PropTypes.object.isRequired,
	onRestore: PropTypes.func,
	deletedProjects: PropTypes.array,
	searchQuery: PropTypes.string,
	activeContractTab: PropTypes.string,
	handleReviewFormSubmit: PropTypes.func,
	handleDelete: PropTypes.func,
	onClick: PropTypes.func.isRequired, // Añadir propTypes para onClick
	activeTab: PropTypes.string.isRequired, // Añadir propTypes para activeTab
}

export default Tabs
