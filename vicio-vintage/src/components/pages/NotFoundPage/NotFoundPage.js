import React from 'react';
import NavBar from '../../NavBar/NavBar';
import './NotFoundPage.css'; // Asegúrate de que el nombre y la ruta del archivo CSS sean correctos.


function NotFoundPage() {
  return (
    <>
    <NavBar />
    <div className="not-found-page">
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
    </>
  );
}

export default NotFoundPage;
