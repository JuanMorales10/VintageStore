import React from 'react';
import './Header.css'; // Asumiendo que el CSS para Header está en Header.css

const Header = () => {
  return (
    <section className="top-txt">
      <div className="head container">
        <div className="head-txt">
          <p></p>
        </div>
        <div className="sing_in_up">
          <a href="#">SIGN IN</a>
          <a href="#">SIGN UP</a>
        </div>
      </div>
    </section>
  );
};

export default Header;
