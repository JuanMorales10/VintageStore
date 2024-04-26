

// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './ProductDetailPage.css';
// import ropa from '../../../assets/ropa.jpg'; // Asegúrate de que la ruta es correcta
// import SimpleCarousel from '../../SimpleCarousel/SimpleCarousel';

// const ProductDetailPage = () => {
//   const product = {
//     name: "Colorful Retro",
//     description: "Vintage white t-shirt available. Authentic piece with a retro vibe. Grab it now!",
//     images: [ropa, ropa, ropa], // Asegúrate de que las rutas de las imágenes son accesibles
//     price: "29.99",
//     size: "Medium",
//     material: "100% Cotton",
//     brand: "Vintage Finds"
//   };

//   const responsive = {
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
//   };

//   return (<>
//       <SimpleCarousel />
//     <div className="product-detail-container">
//       {/* <Carousel responsive={responsive} infinite={true} showDots={true} autoPlay={true} autoPlaySpeed={3000}>
//         {product.images.map((image, index) => (
//           <img key={index} src={image} alt={product.name} className="carousel-image" />
//         ))}
//       </Carousel> */}
//       <div className="product-detail-content">
//         <h2 className="product-title">{product.name}</h2>
//         <p className="product-location">Discover Retro Fashion - London, UK</p>
//         <p className="product-description">{product.description}</p>
//         <p className="product-price">now for ${product.price}</p>
//         <ul className="product-meta">
//           <li>Size: {product.size}</li>
//           <li>Material: {product.material}</li>
//           <li>Brand: {product.brand}</li>
//         </ul>
//         <button className="add-to-basket-button">Add to basket</button>
//       </div>
//       <SimpleCarousel />
//     </div>
//       </>
//   );
// };

// export default ProductDetailPage;

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProductDetailPage.css';
import ropa from '../../../assets/ropa.jpg'; // Asegúrate de que la ruta es correcta
import ProductList from '../../ProductList/ProductList';

const ProductDetailPage = () => {

  const topProducts = [
    {
      id: 1,
      image: ropa ,
      name: 'Producto 1',
      price: '29.99',
      link: '/buy/product1'
    },
    {
        id: 2,
        image: ropa ,
        name: 'Producto 2',
        price: '29.99',
        link: '/buy/product1'
      },
      {
        id: 2,
        image: ropa ,
        name: 'Producto 2',
        price: '29.99',
        link: '/buy/product1'
      },
      {
        id: 2,
        image: ropa ,
        name: 'Producto 2',
        price: '29.99',
        link: '/buy/product1'
      },    // más productos...
  ];
  const product = {
    name: "Colorful Retro",
    description: "Vintage white t-shirt available. Authentic piece with a retro vibe. Grab it now!",
    images: [ropa, ropa, ropa],
    price: "29.99",
    size: "Medium",
    material: "100% Cotton",
    brand: "Vintage Finds"
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <>
    <div className="product-detail-page">
      <div className="carousel-containerrr">
        <Carousel responsive={responsive} infinite={true} showDots={false} autoPlay={true} autoPlaySpeed={7000}>
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={product.name} className="product-image" />
          ))}
        </Carousel>
      </div>
      <div className="product-detail-content">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <span>Size: {product.size}</span>
          <span>Material: {product.material}</span>
          <span>Brand: {product.brand}</span>
        </div>
        <button className="add-to-basket-button">Add to Basket</button>
      </div>
    </div>
      <ProductList  products={topProducts} /> 
            </>
  );
};

export default ProductDetailPage;

