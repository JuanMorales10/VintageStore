import React from 'react';
import './complete.css';
import NavBar from '../../NavBar/NavBar';

const CompletePage = () => {
    return (
        <>
        <NavBar />
        <div className="complete-cancel-container">
            <h1>Compra Completada</h1>
            <p>¡Gracias por tu compra! Tu orden ha sido procesada exitosamente.</p>
        </div>
        </>
    );
};

export default CompletePage;
