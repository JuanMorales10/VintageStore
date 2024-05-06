// import React, { useState, useEffect } from 'react';
// import { getCart, removeFromCart, updateCart, clearCart } from '../../../utils/cartUtils';
// import './CartPage.css'; // Asegúrate de tener los estilos correspondientes en CartPage.css

// const CartPage = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const fetchCart = () => {
//       const storedCart = getCart();
//       setCart(storedCart);
//     };

//     fetchCart();
//   }, []);

//   const handleRemoveFromCart = (productId) => {
//     removeFromCart(productId);
//     const updatedCart = cart.filter(item => item.id !== productId);
//     setCart(updatedCart);
//   };

//   const handleUpdateCart = (productId, newQuantity) => {
//     if (newQuantity > 0) {
//       updateCart(productId, newQuantity);
//       const updatedCart = cart.map(item => {
//         if (item.id === productId) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       });
//       setCart(updatedCart);
//     }
//   };

//   const handleClearCart = () => {
//     clearCart();
//     setCart([]);
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cart.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <div className="cart-item-img">
//                   {item.imagenes && item.imagenes.length > 0 && (
//                     <img src={`http://localhost:3002/img/products/${item.imagenes[0].url}`} alt={item.nombre} />
//                   )}
//                 </div>
//                 <div className="cart-item-info">
//                   <h3>{item.nombre}</h3>
//                   <p>Price: ${item.precio}</p>
//                   <p>Quantity: 
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => handleUpdateCart(item.id, parseInt(e.target.value))}
//                     />
//                   </p>
//                   <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button onClick={handleClearCart}>Clear Cart</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, updateCart, clearCart } from '../../../utils/cartUtils';
import './CartPage.css';

const CartItem = ({ item, onRemove, onUpdate }) => {

  console.log(item)
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
            <div className="cart-item-info">
                <h3>{item.nombre}</h3>
                <p>Price: ${item.precio}</p>
                <p>Quantity:
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleChange}
                    />
                </p>
                <button onClick={() => onRemove(item.id)}>Remove</button>
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

  return (
      <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
              <div className="cart-items">
                  {cart.map((item) => (
                      <CartItem key={item.id} item={item} onRemove={handleRemoveFromCart} onUpdate={handleUpdateCart} />
                  ))}
                  <button onClick={handleClearCart}>Clear Cart</button>
              </div>
          )}
      </div>
  );
};

export default CartPage;


