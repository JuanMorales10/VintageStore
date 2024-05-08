import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ColeccionPage.css'
import accesorios from '../../../assets/accesoriosv.jpg'
import camisetav from '../../../assets/camisetav.avif'
import chaquetav from '../../../assets/chaquetav.avif'
import denim from '../../../assets/denim.avif'
import faldav from '../../../assets/faldav.avif'
import pantalonv from '../../../assets/pantalonv.avif'
import pielv from '../../../assets/pielv.avif'
import totallook from '../../../assets/total-look.avif'
import vestidov from '../../../assets/vestidov.avif'
import zapatosv from '../../../assets/zapatosv.avif'
import NavBar from '../../NavBar/NavBar';

const ColeccionPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); // Agregamos estado de error

  const imagenesCategorias = {
    'Accesorios': accesorios,
    'Camisetas': camisetav,
    'Chaquetas': chaquetav,
    'Denim': denim,
    'Faldas': faldav,
    'Pantalones': pantalonv,
    'Piel': pielv,
    'Total Look': totallook,
    'Vestidos': vestidov,
    'Zapatos': zapatosv
  };


  useEffect(() => {
    (async function fetchCategorias() {
      try {
        const response = await fetch('http://localhost:3002/api/categorias');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        // Asignar la imagen correspondiente a cada categoría
        data = data.map(categoria => ({
          ...categoria,
          imagenURL: imagenesCategorias[categoria.nombre] || 'URL_de_imagen_por_defecto'
        }));
        setCategorias(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error al cargar las categorías');
      }
    })();
  }, []);


  // Si hay un error, mostrar algún mensaje o UI alternativa
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
    <NavBar />
    <div className="coleccion-page">
      <h1>Catálogo</h1>
      <div className="categorias-container">
        {categorias.map(categoria => (
          <div key={categoria.id_categoria} className="categoria-card">
            <Link to={`/categoria/${categoria.id_categoria}`}>
              <div className="categoria-imagen">
                <img src={categoria.imagenURL} alt={categoria.nombre} />
              </div>
              <h2>{categoria.nombre}</h2>
            </Link>
          </div>
        ))}

      </div>
    </div>
        </>
  );
};

export default ColeccionPage;
