import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Importa correctamente jwtDecode
import './NavBar.css';
import logo from '../../assets/logovintage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);  // Usa jwtDecode para decodificar el token
                setUserRole(decoded.rol);  // Asume que el campo se llama 'rol'
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

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
                <Link to="/#contact-us" className="navbar-links">Contáctanos</Link>
                </li>
                {userRole === 'admin' && (
                    <li className="navbar-item">
                        <Link to="/admin/dashboard" className="navbar-links">Dashboard</Link>
                    </li>
                )}
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

