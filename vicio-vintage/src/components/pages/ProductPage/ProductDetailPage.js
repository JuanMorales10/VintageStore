// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './ProductDetailPage.css';
// import ropa from '../../../assets/ropa.jpg'; // Asegúrate de que la ruta es correcta
// import ProductList from '../../ProductList/ProductList';

// const ProductDetailPage = () => {



//   const responsive = {
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
//   };

//   return (
//     <>
//     <div className="product-detail-page">
//       <div className="carousel-containerrr">
//         <Carousel responsive={responsive} infinite={true} showDots={false} autoPlay={true} autoPlaySpeed={7000}>
//           {product.images.map((image, index) => (
//             <img key={index} src={image} alt={product.name} className="product-image" />
//           ))}
//         </Carousel>
//       </div>
//       <div className="product-detail-content">
//         <h2 className="product-title">{product.name}</h2>
//         <p className="product-price">${product.price}</p>
//         <p className="product-description">{product.description}</p>
//         <div className="product-meta">
//           <span>Size: {product.size}</span>
//           <span>Material: {product.material}</span>
//           <span>Brand: {product.brand}</span>
//         </div>
//         <button className="add-to-basket-button">Add to Basket</button>
//       </div>
//     </div>
//       <ProductList  products={topProducts} /> 
//             </>
//   );
// };

// export default ProductDetailPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProductDetailPage.css';
import { addToCart } from '../../../utils/cartUtils'; 

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/products/${productId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to fetch product");
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagenes: product.imagenes
    };
    addToCart(productToAdd, 1);  // Añade un producto con cantidad 1
  };
  


  if (error) return <p>Error loading product: {error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className="product-detail-page">
        <div className="carousel-containerrr">
          <Carousel responsive={responsive} infinite={true} showDots={false} autoPlay={true} autoPlaySpeed={7000}>
            {product.imagenes.map((image, index) => (
              <img key={index} src={`http://localhost:3002/img/products/${image.url}`} alt={`${product.nombre}-${index}`} className="product-image" />
            ))}
          </Carousel>
        </div>
        <div className="product-detail-content">
          <h2 className="product-title">{product.nombre}</h2>
          <p className="product-price">${product.precio}</p>
          <p className="product-description">{product.descripcion}</p>
          <div className="product-meta">
            <span>Stock: {product.stock}</span>
            <br />
            <span>Size: {product.talla}</span>
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary btn-block btn-large">
              Add to Cart
            </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
