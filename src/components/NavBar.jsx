import styles from '../utils/styles/LandingPage.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, setLightMode } from '../redux/actions';
import SearchBar from './SearchBar';

const NavBar = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme);
    const [navbar, setNavbar] = useState(false);

    const darkMode = () => {
        document.querySelector('html').setAttribute('data-bs-theme', 'dark');
        document.querySelector('#dl-icon').className = 'bi bi-sun-fill';
    };

    const lightMode = () => {
        document.querySelector('html').setAttribute('data-bs-theme', 'light');
        document.querySelector('#dl-icon').className = 'bi bi-moon-fill';
    };

    const changeTheme = () => {
        if (theme === 'light') {
            dispatch(setDarkMode());
        } else {
            dispatch(setLightMode());
        }
    };

    useEffect(() => {
        if (theme === 'dark') {
            darkMode();
        } else {
            lightMode();
        }
    }, [theme]);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    return (
        <nav
            className={`navbar navbar-expand-lg fixed-top ${
                navbar ? styles.bgDark : styles.bgTransparent
            }`}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    ForDevs
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home">
                                Explorar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Precios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">
                                Mis Proyectos
                            </a>
                        </li>
                    </ul>
                    <SearchBar />
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Ingresar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                Regístrate
                            </a>
                        </li>
                        <li className="nav-item">
                            <button onClick={changeTheme} className="btn rounded-fill">
                                <i id="dl-icon" className="bi bi-moon-fill"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
