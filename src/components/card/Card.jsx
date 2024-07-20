import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CardDiv = styled.div`
  .card {
    width: 379.33px;
    height: 285.42px;
    position: relative;
  }
  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
      color: #FFFFFF;
      text-decoration: none;
      display: block;
      width: 294.33px;
      padding: 0px 0px 2px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  }
  .card-img-overlay:hover .card-text a {
    opacity: 1;
  }
  .info-bar {
    width: 339.33px;
    background-color: transparent; 
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;  
  }
  .project-title {
    p {
      margin: 0;
      color: black; 
      text-decoration: none;
      font-weight: bold;
    }
  }
  .technologies {
    font-size: 18px;
    color: black; 
  }
`;

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
            <span key={index}>{tech.name}{index < technologies.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
      </div>
      </Link>
    </CardDiv>
  );
};

export default Card;
