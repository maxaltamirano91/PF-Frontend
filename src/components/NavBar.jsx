import React from 'react';
import { Link } from 'react-router-dom'; 

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          ForDevs
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-primary mr-2">
                Iniciar sesión
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary">
                Registrarse
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
