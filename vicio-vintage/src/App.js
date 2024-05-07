// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/HomePage/HomePage';
// import NotFound from './components/pages/NotFoundPage/NotFoundPage';
// import NavBar from './components/NavBar/NavBar';
// import Footer from './components/Footer/Footer';
// import ProductDetailPage from './components/pages/ProductPage/ProductDetailPage'; // Asegúrate de que el import es correcto
// import ProductForm from './components/pages/CreateForm/ProductForm';
// import EditProductForm from './components/pages/EditForm/EditProductForm';
// import ColeccionPage from './components/pages/Coleccion/ColeccionPage';
// import ProductList from './components/ProductList/ProductList';
// import CartPage from './components/pages/CartPage/CartPage';

// function App() {
//   return (
//     <Router>
//     <div className='App' style={{
//         fontFamily: 'Bungee Shade, sans-serif',
//         fontOpticalSizing: 'auto'
//       }}>
//         <NavBar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/carrito' element={<CartPage />} />
//           <Route path='/categoria/:categoryId' element={<ProductList /> } />
//           <Route path="/coleccion" element={<ColeccionPage />} />
//           <Route path='/create-product' element={<ProductForm />} />
//           <Route path="/products/:productId" element={<ProductDetailPage />} />
//           <Route path='/products/edit/:productId?' element={<EditProductForm />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/HomePage';
import NotFound from './components/pages/NotFoundPage/NotFoundPage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetailPage from './components/pages/ProductPage/ProductDetailPage';
import ProductForm from './components/pages/CreateForm/ProductForm';
import EditProductForm from './components/pages/EditForm/EditProductForm';
import ColeccionPage from './components/pages/Coleccion/ColeccionPage';
import ProductList from './components/ProductList/ProductList';
import CartPage from './components/pages/CartPage/CartPage';
import CompletePage from './components/pages/CompletePage/CompletePage';
import CancelPage from './components/pages/CancelPage/CancelPage'; 

function App() {
  return (
    <Router>
      <div className='App' style={{
          fontFamily: 'Bungee Shade, sans-serif',
          fontOpticalSizing: 'auto'
        }}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/carrito' element={<CartPage />} />
            <Route path='/categoria/:categoryId' element={<ProductList />} />
            <Route path="/coleccion" element={<ColeccionPage />} />
            <Route path='/create-product' element={<ProductForm />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path='/products/edit/:productId?' element={<EditProductForm />} />
            <Route path='/complete' element={<CompletePage />} />
            <Route path='/cancel' element={<CancelPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
