import styles from './Tabs.module.css'
import styled from 'styled-components'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfileProjects from '../../components/profile-projects/ProfileProjects'
import Reviews from '../reviews/Reviews'
import PropTypes from 'prop-types'
import Cards from '../cards/Cards'
import ContractView from '../../view/profile-page/components/ContractView'
import { Link } from 'react-router-dom'

const Tabs = ({ profileData, onRestore, deletedProjects, searchQuery, activeContractTab }) => {
	const { loggedUser } = useSelector((state) => state.auth)
	const [activeTab, setActiveTab] = useState('projects')
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
			content: <Reviews tabName="Reviews" />,
		},
	]

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

		const modifiedProfileData = { ...profileData, projects: deletedProjects }
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
						onClick={() => setActiveTab(tab.key)}
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
}

export default Tabs

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`