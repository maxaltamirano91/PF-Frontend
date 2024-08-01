import { useState } from 'react'
import styled from 'styled-components'
import AdminViewUsers from './AdminView-users'
import AdminViewProjects from './AdminView-projects'
import AdminViewTechnologies from './AdminView-technologies'
import AdminViewData from './AdminViewData'
import AdminViewContracts from './AdminView-contracts'
import AdminViewDeletedUsers from './AdminView-deletedUsers'
import AdminViewReviews from './AdminViewReviews'

const AdminView = () => {
	const categories = Object.freeze({
		users: 'users',
		projects: 'projects',
		technologies: 'technologies',
		contracts: 'contracts',
		deletedUsers: 'deletedUsers',
		reviews: 'reviews',
		data: 'data',
	})
	const [activeTab, setActiveTab] = useState(categories.users)
	const [searchQuery, setSearchQuery] = useState('')

	const handleTabClick = (category) => {
		setActiveTab(category)
		setSearchQuery('')
	}

	return (
		<div>
			<SectionStyled className="container-fluid mt-2" id="dashboard">
				<h2>Hola, Admin</h2>
				<div className="mt-4 ">
					<ul className="nav nav-tabs ">
						<li className="nav-item ">
							<a
								className={`nav-link ${
									activeTab === categories.users ? 'active' : ''
								}`}
								aria-current={activeTab === 'users' ? 'page' : undefined}
								onClick={() => handleTabClick(categories.users)}
							>
								Usuarios
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.projects ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.projects ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.projects)}
							>
								Proyectos
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.technologies ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.technologies ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.technologies)}
							>
								Tecnologías
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.contracts ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.contracts ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.contracts)}
							>
								Contratos
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.reviews ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.reviews ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.reviews)}
							>
								Reseñas
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.deletedUsers ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.deletedUsers ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.deletedUsers)}
							>
								Usuarios eliminados
							</a>
						</li>
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.data ? 'active' : ''
								}`}
								aria-current={
									activeTab === categories.data ? 'page' : undefined
								}
								onClick={() => handleTabClick(categories.data)}
							>
								Datos
							</a>
						</li>
						<li className="nav-item ">
							<div className="input-group mb-3">
								<span className="input-group-text" id="basic-addon1">
									{activeTab}@
								</span>
								<input
									type="text"
									className="form-control"
									placeholder="Buscar"
									aria-label="Username"
									aria-describedby="basic-addon1"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</li>
					</ul>

					<div className="content-tab" id="content-tab">
						{activeTab === categories.users && (
							<AdminViewUsers searchQuery={searchQuery} />
						)}
						{activeTab === categories.projects && (
							<AdminViewProjects searchQuery={searchQuery} />
						)}
						{activeTab === categories.technologies && (
							<AdminViewTechnologies searchQuery={searchQuery} />
						)}
						{activeTab === categories.contracts && (
							<AdminViewContracts searchQuery={searchQuery} />
						)}
						{activeTab === categories.deletedUsers && (
							<AdminViewDeletedUsers searchQuery={searchQuery} />
						)}
						{activeTab === categories.data && (
							<AdminViewData searchQuery={searchQuery} />
						)}
						{activeTab === categories.reviews && (
							<AdminViewReviews searchQuery={searchQuery} />
						)}
					</div>
				</div>
			</SectionStyled>
		</div>
	)
}

export default AdminView

const SectionStyled = styled.section`
	a.nav-link {
		cursor: pointer;

		&.active {
			font-weight: 700;
		}
		&:hover {
			/* background: none; */
		}
	}
`
