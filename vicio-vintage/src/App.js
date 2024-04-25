import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/HomePage';
import NotFound from './components/pages/NotFoundPage/NotFoundPage';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductDetailPage from './components/pages/ProductPage/ProductDetailPage'; // Asegúrate de que el import es correcto
import ProductForm from './components/pages/CreateForm/ProductForm';
import EditProductForm from './components/pages/EditForm/EditProductForm';

function App() {
  return (
    <Router>
    <div className='App' style={{
        fontFamily: 'Lugrasimo, cursive',
        fontOpticalSizing: 'auto'
      }}>
        <Header />
        <NavBar />
        <Routes>
          {/* <Route path='/' element={<ProductForm />} /> */}
          <Route path='/' element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path='/products/edit/:productId?' element={<EditProductForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

