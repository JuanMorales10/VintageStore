// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './Card.css';  // Asegúrate de tener el CSS correctamente configurado
// import { Link } from 'react-router-dom';

// const Card = ({ images, name, price, id , link}) => {
//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1
//     }
//   };

//   return (
//     <div className="card">
//       <Link to={`/products/${id}`}>
//         <Carousel
//           responsive={responsive}
//           infinite={true}
//           autoPlay={false}  // Deshabilitar autoPlay si no es necesario
//           keyBoardControl={true}
//           customTransition="all .5s"
//           containerClass="card-carousel-container"
//           itemClass="card-carousel-item">
//           {images.map((image, index) => (
//             <img key={index} src={`http://localhost:3002/img/products/${image}`} alt={`${name}-${index}`} className="card-image" />
//           ))}
//         </Carousel>
//         <div className="card-body">
//           <h4 className="card-title">{name}</h4>
//           <p className="card-price">${price}</p>
//           <a href={link} className="card-button">Buy Now</a>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Card;

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

  const handleAddToCart = () => {
    const productToAdd = {
      id,
      name,
      price,
      images
    };
    addToCart(productToAdd, 1);  // Añade un producto con cantidad 1
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
          {stock > 0 ? (
            <button onClick={handleAddToCart} className="btn btn-primary btn-block btn-large">
              Add to Cart
            </button>
          ) : (
            <p className="out-of-stock">Out of Stock</p>
          )}
        </div>
    </Link>
      </div>
  </>
  );
};

export default Card;




