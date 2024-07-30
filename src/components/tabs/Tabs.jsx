import styles from './Tabs.module.css'
import styled from 'styled-components'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileProjects from '../../components/profile-projects/ProfileProjects'
import PropTypes from 'prop-types'
import Cards from '../cards/Cards'
import ContractView from '../../view/profile-page/components/ContractView'

const Tabs = ({ profileData, onRestore, deletedProjects, searchQuery, activeContractTab }) => {
	const { loggedUser } = useSelector(state => state.auth)
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
			key: 'contracts',
			label: 'Contratos',
			content: (
				<ContractView searchQuery={searchQuery} activeContractTab={activeContractTab} categories={categories} />
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

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`