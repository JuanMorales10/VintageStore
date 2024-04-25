import React from 'react';
import './MainBanner.css'; // Asumiendo que el CSS para MainBanner está en MainBanner.css
import test from '../../assets/test.jpg'

const MainBanner = () => {
  return (
    <section id="home">
      <div className="home_page">
        <div className="home_img">
          <img src={test} alt="Summer Collection" />
        </div>
        <div className="home_txt">
          <p className="collectio">COLLECTION</p>
          <h2>PRIMAVERA - VERANO<br/>Collection 2024</h2>
          <div className="home_label">
            <p>A specialist label creating luxury essentials. Ethically crafted<br/>with an unwavering commitment to exceptional quality.</p>
          </div>
          <button><a href="#sellers">SHOP NOW</a><i className='bx bx-right-arrow-alt'></i></button>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
