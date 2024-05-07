import React from 'react';
import './complete.css';

const CompletePage = () => {
    return (
        <div className="complete-cancel-container">
            <h1>Compra Completada</h1>
            <p>¡Gracias por tu compra! Tu orden ha sido procesada exitosamente.</p>
            <a href="/">Volver a la tienda</a>
        </div>
    );
};

export default CompletePage;
