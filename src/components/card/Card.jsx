import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = (project) => {
	return (
		<CardDiv className="card">
			<img src={project.image} className="card-img-top" alt={project.title} />
			<div className="card-body">
				<h3 className="card-title">{project.title}</h3>
				<p className="card-text">
					{project.technologies.map(tech => tech.name).join(' ')}
				</p>
				<p>{project.tags.join(' ')}</p>
				<Link to={`/project/detail/${project.id}`} className="btn btn-primary">
					View Detail
				</Link>
			</div>
		</CardDiv>
	)
}

export default Card

// ? Styles
const CardDiv = styled.section`
	/* width: 100%; */
`