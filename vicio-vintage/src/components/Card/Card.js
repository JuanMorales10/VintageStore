import React from 'react';
import './Card.css';  // Asegúrate de tener el CSS correctamente configurado

const Card = ({ image, name, price, link }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image"/>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-price">${price}</p>
        <a href={link} className="card-button">Buy Now</a>
      </div>
    </div>
  );
};

export default Card;
