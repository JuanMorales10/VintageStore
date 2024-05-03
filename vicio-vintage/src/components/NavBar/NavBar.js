import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logovintage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to='/'>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/coleccion">Colección</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to='/carrito'><FontAwesomeIcon icon={faShoppingCart}  className='cart'/></Link></li>  
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;



