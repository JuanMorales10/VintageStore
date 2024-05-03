import React from 'react';
import MainBanner from '../../MainBanner/MainBanner';
import Collections from '../../Collections/Collections';
import ProductList from '../../ProductList/ProductList';
import NewsSection from '../../NewsSection/NewSection';
import ContactForm from '../../ContactForm/ContactForm';
import ropa from '../../../assets/ropa.jpg'
import LProductList from '../../LastProductList/LProdcutList';

function HomePage() {
 
  return (
    <div className="home-page">
      <MainBanner />
      <Collections /> 
      <LProductList />     
      <NewsSection /> 
      <ContactForm />
    </div>
  );
}

export default HomePage;

