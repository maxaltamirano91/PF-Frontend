import styles from './Tabs.module.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileProjects from '../../components/profile-projects/ProfileProjects'
import PropTypes from 'prop-types'

const Tabs = ({ profileData, onRestore, deletedProjects }) => {
	const { loggedUser } = useSelector(state => state.auth)
	const [activeTab, setActiveTab] = useState('projects')

	const tabs = [
		{
			key: 'projects',
			label: 'Proyectos',
			content: (
				<ProfileProjects tabName="Proyectos" profileData={profileData} />
			),
		},
		{
			key: 'contracts',
			label: 'Contratos',
			content: (
				<ProfileProjects tabName="Contratos" profileData={profileData} />
			),
		},
	]

	if (loggedUser?.id === profileData?.id) {
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
						activeTab === tab.key && <div key={tab.key}>{tab.content}</div>
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
