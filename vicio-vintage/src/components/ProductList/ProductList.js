// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import './ProductList.css'; // Asegúrate que los estilos están correctamente vinculados

// // Asumimos que cada producto usa un componente Card para renderizarse
// import Card from '../Card/Card'; 

// const ProductList = ({ title, products }) => {
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 4
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 768 },
//       items: 3
//     },
//     mobile: {
//       breakpoint: { max: 768, min: 0 },
//       items: 1
//     }
//   };

//   return (
//     <section id="sellers" className="seller">
//       <h2>{title}</h2>
//       <Carousel responsive={responsive} infinite={true} swipeable={true} draggable={true} 
//                 autoPlay={true} autoPlaySpeed={3000} keyBoardControl={true} 
//                 customTransition="all .5" transitionDuration={500}>
//         {products.map((product) => (
//           <div className='card'>
//             <Card key={product.id} {...product} /> 
//           </div>
//         ))}
//       </Carousel>
//     </section>
//   );
// };

// export default ProductList;

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './ProductList.css'; // Asegúrate de incluir estilos personalizados si son necesarios

const ProductList = ({ title, products }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="product-list">
      <h2 className='tit'>Ultimas Prendas</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5s"
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </Carousel>
    </section>
  );
};

export default ProductList;


