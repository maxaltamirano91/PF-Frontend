import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          ForDevs
        </Link>

        <SearchBar ></SearchBar>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary mr-2">
                Iniciar sesión
              </Link>
            </li>
            &nbsp;
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
