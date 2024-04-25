import React from 'react';
import MainBanner from '../../MainBanner/MainBanner';
import Collections from '../../Collections/Collections';
import ProductList from '../../ProductList/ProductList';
import NewsSection from '../../NewsSection/NewSection';
import ContactForm from '../../ContactForm/ContactForm';
import ropa from '../../../assets/ropa.jpg'

function HomePage() {
  // Ejemplo de datos, reemplaza con datos reales posiblemente provenientes de un API o estado global
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

  return (
    <div className="home-page">
      <MainBanner />
      <Collections /> 
      <ProductList  products={topProducts} /> 
      <NewsSection /> 
      <ContactForm />
    </div>
  );
}

export default HomePage;

