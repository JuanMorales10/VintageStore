import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ColeccionPage.css'
import accesorios from '../../../assets/accesoriosv.jpg'
import camisetav from '../../../assets/camisetav.jpg'
import chaquetav from '../../../assets/chaquetav.jpg'
import denim from '../../../assets/denim.jpg'
import faldav from '../../../assets/faldav.jpg'
import pantalonv from '../../../assets/pantalonv.jpg'
import pielv from '../../../assets/pielv.jpg'
import totallook from '../../../assets/totallook.jpg'
import vestidov from '../../../assets/vestidov.jpg'
import zapatosv from '../../../assets/zapatosv.jpg'

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
        const response = await fetch('http://localhost:3002/api/categories');
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
  );
};

export default ColeccionPage;
