import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const Card = ({ id, title, technologies, image, tags }) => {
	return (
		// <div className="card " style={{ width: '18rem', height: '24rem', margin:"10px", display:"flex", flexWrap:"wrap", backgroundColor:"white" }}>
		<CardDiv className="card">
			<img src={image} className="card-img-top" alt={title} />
			<div className="card-body">
				<h3 className="card-title">{title}</h3>
				<p className="card-text">
					{technologies.map(tech => tech.name).join(' ')}
				</p>
				<p>{tags.join(' ')}</p>
				<Link to={`/project/detail/${id}`} className="btn btn-primary">
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