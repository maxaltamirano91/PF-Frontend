import { useState } from 'react'

import styled from 'styled-components'
import AdminViewUsers from './AdminView-users'
import AdminViewProjects from './AdminView-projects'
import AdminViewTechnologies from './AdminView-technologies'

const AdminView = () => {
	const categories = Object.freeze({
		users: 'users',
		projects: 'projects',
		technologies: 'technologies',
	})
	const [activeTab, setActiveTab] = useState('users')

	const handleTabClick = (category) => {
		setActiveTab(category)
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
								className={`nav-link ${activeTab ? 'disabled' : ''}`}
								aria-current={activeTab ? 'page' : undefined}
								// onClick={() => handleTabClick(categories.technologies)}
							>
								Próximamente...
							</a>
						</li>
						<li className="nav-item ">
							<div className="input-group    mb-3">
								<span className="input-group-text " id="basic-addon1">
									@
								</span>
								<input
									type="text"
									className="form-control"
									placeholder="Buscar"
									aria-label="Username"
									aria-describedby="basic-addon1"
								/>
							</div>
						</li>
					</ul>

					<div className="content-tab " id="content-tab">
						{activeTab === categories.users && <AdminViewUsers />}
						{activeTab === categories.projects && <AdminViewProjects />}
						{activeTab === categories.technologies && <AdminViewTechnologies />}
					</div>
				</div>
			</SectionStyled>
		</div>
	)
}

export default AdminView

const SectionStyled = styled.section`
	/* justify-content: center; */
	/* align-items: center; */
	/* min-height: 512px; */
	/* text-align: center; */
	/* margin: auto; */

	/* height: 100vh; */

	.content-tab {
		/* background-color: #b4b4b456; */
	}

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
