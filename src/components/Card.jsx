// card.jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const Card = ({ id, image, title }) => {
	return (
		// <div className="card " style={{ width: '18rem', height: '24rem', margin:"10px", display:"flex", flexWrap:"wrap", backgroundColor:"white" }}>
		<div className="card " style={{ width: '300px', height: '500px', margin:"10px", display:"inline-block", flexWrap:"wrap", overflow:"hidden" }}>
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
		</div>
	)
}

export default Card

// const Card2 = ({ src = false, key, id, image, title }) => {
// 	return (
// 		<div className="container" id={id}>
// 			<Link to={`/project/detail/${id}`}>
// 				<div className="container-fluid">
// 					<div className="row ">
// 						<div className="col-md-4" key={key}>
// 							<div className="card border-0">
// 								<img src={image} className="card-img-top" alt={title} />
// 								<div className="card-body">
// 									<h5 className="card-title ">{title}</h5>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 		</div>
// 	)
// }
