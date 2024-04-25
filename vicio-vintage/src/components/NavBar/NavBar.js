import React from 'react';
import './NavBar.css'; // Asumiendo que el CSS para NavBar está en NavBar.css
import { Link } from 'react-router-dom';
import logo from '../../assets/logovintage.png'

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
          <li><a href="#home">Home</a></li>
          <li><a href="#sellers">Shop</a></li>
          <li><a href="#news">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a></a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
