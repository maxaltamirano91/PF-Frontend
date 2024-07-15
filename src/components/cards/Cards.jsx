import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Card from '../card/Card'

const Cards = () => {
	const { allProjects } = useSelector((state) => state.project)

	return (
		<CardsDiv className="container-fluid">
			{allProjects.length ? (
				allProjects.map((project) => (
					<Card
						key={project.id}
						id={project.id}
						title={project.title}
						description={project.description}
						technologies={project.technologies}
						tags={project.tags}
						image={project.image}
					/>
				))
			) : (
				<p>No se encontraron los proyectos</p>
			)}
		</CardsDiv>
	)
}

export default Cards

// Styles
const CardsDiv = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 20px;
	margin: 50px 0;
	padding: 10px 30px;
	@media (max-width: 992px) {
		grid-template-columns: 1fr;
	}
`
