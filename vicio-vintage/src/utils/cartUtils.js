// export function getCart() {
//     return JSON.parse(localStorage.getItem('cart')) || [];
// }

// export function saveCart(cart) {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// export function addToCart(product, quantity = 1) {
//     const cart = getCart();
//     const existingProductIndex = cart.findIndex(item => item.nombre === product.nombre);
//     if (existingProductIndex !== -1) {
//         cart[existingProductIndex].quantity += quantity;
//     } else {
//         cart.push({ ...product, quantity });
//     }
//     saveCart(cart);
// }

// export function removeFromCart(productId) {
//     const cart = getCart();
//     console.log("Current Cart: ", cart);
//     console.log("Product ID to remove: ", productId);

//     // Asegurándonos de que el ID del producto sea un número si es que los IDs son numéricos
//     const productIdNumber = Number(productId);

//     const newCart = cart.filter(item => Number(item.id) !== productIdNumber);
//     console.log("New Cart After Removal: ", newCart);
    
//     saveCart(newCart);
// }


// export function updateCart(productId, quantity) {
//     const cart = getCart();
//     const productIndex = cart.findIndex(item => item.id === productId);
//     if (productIndex !== -1) {
//         cart[productIndex].quantity = quantity;
//         saveCart(cart);
//     }
// }

// export function clearCart() {
//     localStorage.removeItem('cart');
// }
export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();
    console.log("Current Cart: ", cart);
    console.log("Product ID to remove: ", productId);

    // Asegurándonos de que el ID del producto sea un número si es que los IDs son numéricos
    const productIdNumber = Number(productId);

    const newCart = cart.filter(item => Number(item.id) !== productIdNumber);
    console.log("New Cart After Removal: ", newCart);
    
    saveCart(newCart);
}

export function updateCart(productId, quantity) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1 && quantity > 0) {
        cart[productIndex].quantity = quantity;
        saveCart(cart);
    } else if (quantity <= 0) {
        removeFromCart(productId);  // Remove the product if the quantity is zero or less
    }
}

export function clearCart() {
    localStorage.removeItem('cart');
}

