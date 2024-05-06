import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Card.css';  // Asegúrate de tener el CSS correctamente configurado
import { Link } from 'react-router-dom';
import { addToCart } from '../../utils/cartUtils';  

const Card = ({ images, name, price, id, stock }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  return (<>
      <div className="card">
    <Link to={`/products/${id}`} className="card-image-link">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}  // Deshabilitar autoPlay si no es necesario
          keyBoardControl={false}
          customTransition="all .5s"
          arrows={false}
          containerClass="card-carousel-container"
          itemClass="card-carousel-item">
          {images.map((image, index) => (
            <img key={index} src={`http://localhost:3002/img/products/${image}`} alt={`${name}-${index}`} className="card-image"/>
          ))}
        </Carousel>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-price">${price}</p>
        </div>
    </Link>
      </div>
  </>
  );
};

export default Card;




