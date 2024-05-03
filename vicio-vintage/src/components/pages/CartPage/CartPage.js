import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCart, clearCart } from '../../../utils/cartUtils';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = () => {
      const storedCart = getCart();
      setCart(storedCart);
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const handleUpdateCart = (productId, newQuantity) => {
    updateCart(productId, newQuantity);
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.imagenes[0].url} alt={item.nombre} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.nombre}</h3>
                  <p>Price: ${item.precio}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateCart(item.id, parseInt(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleClearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
