import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCart, clearCart } from '../../../utils/cartUtils';
import './CartPage.css';
import NavBar from '../../NavBar/NavBar';

const CartItem = ({ item, onRemove, onUpdate }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
        onUpdate(item.id, newQuantity);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-img">
                {item.imagenes && item.imagenes.length > 0 && (
                    <img src={`http://localhost:3002/img/products/${item.imagenes[0].url}`} alt={item.nombre} />
                )}
            </div>
            <div className="cart-item-details">
                <h3>{item.nombre}</h3>
                <p className="price">Precio: ${item.precio}</p>
                <div className="quantity">
                    Cantidad:
                    <input type="number" min="1" value={quantity} onChange={handleChange} />
                <div className="actions">
                    <button onClick={() => onRemove(item.id)} className="remove-btn">Eliminar</button>
                </div>
                </div>
            </div>
        </div>
    );
};

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
      setCart(getCart());
  }, []);

  const handleRemoveFromCart = (productId) => {
    // console.log(productId)
      removeFromCart(productId);
      setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const handleUpdateCart = (productId, newQuantity) => {
      if (newQuantity > 0) {
          updateCart(productId, newQuantity);
          setCart(currentCart => {
              return currentCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item);
          });
      }
  };

  const handleClearCart = () => {
      clearCart();
      setCart([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productInfo = cart.map(item => ({
        nombre: item.nombre,
        precio: item.precio,
        id: item.id,
        quantity: item.quantity,
        imageUrl: item.imagenes[0].url  
    }));
    

    console.log(productInfo)

    const response = await fetch('http://localhost:3002/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: productInfo }),
    });

    const responseData = await response.json();
    if (response.ok) {
        window.location.href = responseData.url; // Redireccionar al URL de Stripe
    } else {
        console.error('Error al procesar el pago:', responseData.error);
    }
};

  return (
    <>
    <NavBar />
    <div className="cart-container">
    <h2>Tu Carrito</h2>
    {cart.length === 0 ? <p>Tu carrito está vacío.</p> : (
        <div className="cart-items">
            {cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveFromCart} onUpdate={handleUpdateCart} />
            ))}
        </div>
    )}
    <div className="total">
    <button onClick={handleClearCart}>Vaciar Carrito</button>
    <button onClick={handleSubmit}>Pagar</button>
        </div>
</div>
    </>
  );
};

export default CartPage;


