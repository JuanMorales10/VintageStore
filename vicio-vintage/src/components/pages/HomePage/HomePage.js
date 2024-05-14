import React, { useEffect } from 'react';
import MainBanner from '../../MainBanner/MainBanner';
import Collections from '../../Collections/Collections';
import ProductList from '../../ProductList/ProductList';
import NewsSection from '../../NewsSection/NewSection';
import ContactForm from '../../ContactForm/ContactForm';
import ropa from '../../../assets/ropa.jpg'
import LProductList from '../../LastProductList/LProdcutList';
import NavBar from '../../NavBar/NavBar';

function HomePage() {

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, []);
 
  return (
    <div className="home-page">
      <NavBar />
      <MainBanner />
      <Collections /> 
      <LProductList />     
      <NewsSection /> 
      <ContactForm />
    </div>
  );
}

export default HomePage;

