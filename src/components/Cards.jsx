import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ image, title }) => {
  return (
    <div className="container mt-5 pt-3">
      <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="card border-0">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
