import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logovintage.png'; // Asegúrate de que la ruta al logo es correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="navbar-toggle" id="mobile-menu" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                <li className="navbar-item">
                    <Link to="/coleccion" className="navbar-links">Colección</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/contact" className="navbar-links">Contáctanos</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/carrito" className="navbar-links">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
