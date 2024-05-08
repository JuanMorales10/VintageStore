import React from 'react';
import '../CompletePage/complete.css'
import NavBar from './../../NavBar/NavBar';

const CancelPage = () => {
    return (
        <>
        <NavBar />
        <div className="complete-cancel-container">
            <h1>Compra Cancelada</h1>
            <p>Has cancelado tu compra. Si fue un error, puedes volver a la tienda para intentarlo de nuevo.</p>
        </div>
        </>
    );
};

export default CancelPage;
