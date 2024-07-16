import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = ({ id, title, technologies, image, tags }) => {
return (
    <CardDiv className="card" style={{ width: '18rem' }}>
    <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
        }}
    />
    <div className="card-body">
        <h5 className="card-title text-center">{title}</h5>
        <div className="technologies">
        {technologies.map((tech, index) => (
            <button key={index} type="button" className="btn btn-outline-secondary btn-sm disabled"
			style={{ marginRight: 5 }}>
            {tech.name}
            </button>
        ))}
        </div>
        <div className="tags">
        {tags.map((tag, index) => (
            <button key={index} type="button" className="btn btn-outline-primary btn-sm disabled"
			style={{ marginRight: 5 }}>
            {tag}
            </button>
        ))}
        </div>
    </div>
    <div className="text-center mb-3"> 
        <Link to={`/project/${id}`} className="btn btn-primary">
        View Detail
        </Link>
    </div>
    </CardDiv>
);
};

//? Styles
const CardDiv = styled.div`
display: flex;
flex-direction: column;
height: 100%;
.card-body {
    flex-grow: 1;
}
`;

export default Card;