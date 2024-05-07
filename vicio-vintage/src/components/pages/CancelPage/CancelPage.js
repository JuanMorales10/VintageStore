import React from 'react';
import '../CompletePage/complete.css'

const CancelPage = () => {
    return (
        <div className="complete-cancel-container">
            <h1>Compra Cancelada</h1>
            <p>Has cancelado tu compra. Si fue un error, puedes volver a la tienda para intentarlo de nuevo.</p>
            <a href="/">Volver a la tienda</a>
        </div>
    );
};

export default CancelPage;
