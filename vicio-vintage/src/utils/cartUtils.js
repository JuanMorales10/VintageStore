export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.nombre === product.nombre);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
}

export function updateCart(productId, quantity) {
    const cart = getCart();
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity = quantity;
        saveCart(cart);
    }
}

export function clearCart() {
    localStorage.removeItem('cart');
}


