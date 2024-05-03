import React from 'react';
import { addToCart, removeFromCart } from '../utils/cartUtils';

const ProductButton = ({ product }) => {
    return (
        <button onClick={() => addToCart(product)}>
            Añadir al Carrito
        </button>
    );
};

export default ProductButton;
