import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../redux/actions'
import { useEffect } from 'react'

import Card from './Card'

const Cards = () => {
	const { allProjects } = useSelector((state) => state.project)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllProjects())
	}, [])

	return (
		<CardsDiv className="container-fluid ">
			{allProjects &&
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
				))}
		</CardsDiv>
	)
}

export default Cards

// ? Styles
const CardsDiv = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	gap: 20px;
	margin: 50px 0;
	padding: 10px;
	@media (max-width: 992px) {
		grid-template-columns: 1fr; /* Una columna por fila para pantallas menores a 992px */
	}
`