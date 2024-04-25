import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/HomePage/HomePage';
// Importa otros componentes de página como sea necesario
// import Products from './components/Products';
// import Contact from './components/Contact';
import NotFound from './components/pages/NotFoundPage/NotFoundPage';
import NavBar from './components/NavBar/NavBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Descomenta y ajusta las siguientes rutas según tus componentes disponibles */}
          {/* <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} /> */}
          {/* Ruta para manejar las URL no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
