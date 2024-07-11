import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = ({ id, image, title }) => {
	return (
		// <div className="card " style={{ width: '18rem', height: '24rem', margin:"10px", display:"flex", flexWrap:"wrap", backgroundColor:"white" }}>
		<CardDiv className="card ">
			<img src={image} className="card-img-top" alt={title} />
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">
					Some quick example text to build on the card title and make up the
					bulk of the card's content.
				</p>
				<Link to={`/project/detail/${id}`} className="btn btn-primary">
					Go somewhere
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