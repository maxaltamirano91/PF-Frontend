import styled from 'styled-components'
import Card from '../card/Card'

const Cards = ({ projects, onRestore }) => {
	return (
		<CardsDiv className="container-fluid">
			{projects?.length ? (
				projects.map((project) => (
					<div key={project.id}>
						<Card
							id={project.id}
							title={project.title}
							description={project.description}
							technologies={project.technologies}
							tags={project.tags}
							image={project.image}
						/>
						{onRestore && (
							<button
								className="btn btn-custom border"
								onClick={() => onRestore(project.id)}
								style={{ textDecoration: 'none', margin: '10px' }}
							>
								Restaurar
							</button>
						)}
					</div>
				))
			) : (
				<p>No se encontraron los proyectos</p>
			)}
		</CardsDiv>
	)
}

export default Cards

const CardsDiv = styled.section`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	margin: 0 auto;
	width: 100%;

	@media (max-width: 992px) {
		grid-template-columns: 1fr;
	}
`
