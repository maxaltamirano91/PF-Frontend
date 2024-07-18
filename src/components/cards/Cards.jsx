import styled from 'styled-components'
import Card from '../card/Card'

const Cards = (projects) => {
	return (
		<CardsDiv className="container-fluid">
			{projects.projects?.length ? (
				projects.projects.map((project) => (
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


