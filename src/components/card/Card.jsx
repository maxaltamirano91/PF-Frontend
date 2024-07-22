import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CardDiv = styled.div`
	.card {
		width: 19rem;
		height: 14rem;
		position: relative;
		overflow: hidden;
		transition: transform 0.3s ease-in-out;
		margin: 5px auto;
	}
	.card:hover {
		transform: scale(1.05);
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease-in-out;
	}

	.card-img-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 0px 0px 2px;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}
	.card-text {
		p {
			color: #ffffff;
			text-decoration: none;
			display: block;
			width: 19rem;
			padding: 0px 0px 2px;
			opacity: 0;
		}
	}
	.card-img-overlay:hover .card-text a {
		opacity: 1;
	}
	.info-bar {
		width: 19rem;
		background-color: transparent;
		padding: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin: auto;
	}
	.project-title {
		p {
			margin: 0;
			text-decoration: none;
			font-weight: bold;
			transition: color 0.3s ease-in-out;
		}
	}
	.technologies {
		font-size: 1rem;
		transition: color 0.3s ease-in-out;
	}

	.card:hover .project-title p,
	.card:hover .technologies {
		color: #000000;
	}
`

const Card = ({ id, title, technologies, image }) => {
	return (
		<CardDiv>
			<Link to={`/project/${id}`}>
				<div className="card text-bg-dark">
					<img src={image} className="card-img" alt="..." />
					<div className="card-img-overlay">
						<p className="card-text">
							<small>
								<p>{title}</p>
							</small>
						</p>
					</div>
				</div>
				<div className="info-bar">
					<div className="project-title">
						<p>{title}</p>
					</div>
					<div className="technologies">
						{technologies.map((tech, index) => (
							<span key={index}>
								{tech.name}
								{index < technologies.length - 1 ? ', ' : ''}
							</span>
						))}
					</div>
				</div>
			</Link>
		</CardDiv>
	)
}

export default Card
