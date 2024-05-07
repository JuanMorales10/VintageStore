// import React from 'react';
// import './NavBar.css';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logovintage.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// const NavBar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="logo">
//           <Link to='/'>
//             <img src={logo} alt="Logo" />
//           </Link>
//         </div>
//         <div className="hamburger-lines">
//           <span className="line line1"></span>
//           <span className="line line2"></span>
//           <span className="line line3"></span>
//         </div>
//         <ul className="menu-items">
//           <li><Link to="/coleccion">Colección</Link></li>
//           <li><Link to="/contact">Contactanos</Link></li>
//           <li><Link to='/carrito'><FontAwesomeIcon icon={faShoppingCart}  className='cart'/></Link></li>  
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logovintage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCartItemCount } from '../../utils/cartUtils';  

const NavBar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const count = getCartItemCount();
      setCartItemCount(count);
    };

    updateCartCount();

    // Escuchar cambios en el local storage
    window.addEventListener('storage', updateCartCount);

    // Limpiar el listener
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

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
          <li><Link to="/coleccion">Colección</Link></li>
          <li><Link to="/contact">Contactanos</Link></li>
          <li>
            <Link to='/carrito'>
              <FontAwesomeIcon icon={faShoppingCart} className='cart'/>
              {/* {cartItemCount > 0 && (
                <span className='cart-count'>{cartItemCount}</span>
              )} */}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;



