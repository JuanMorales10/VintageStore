import React, { useState } from 'react';
import './ProductForm.css'

function ProductForm() {
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        stock: '',
        imagen: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "imagen") {
            setProductData({
                ...productData,
                [name]: event.target.files[0]
            });
        } else {
            setProductData({
                ...productData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        // Enviar formData a tu servidor/API
        try {
            const response = await fetch('http://localhost:3000/api/producst', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                value={productData.nombre}
                onChange={handleChange}
                required
            />

            <label htmlFor="descripcion">Descripción:</label>
            <textarea
                id="descripcion"
                name="descripcion"
                value={productData.descripcion}
                onChange={handleChange}
            />

            <label htmlFor="precio">Precio:</label>
            <input
                type="number"
                id="precio"
                name="precio"
                value={productData.precio}
                onChange={handleChange}
                required
            />

            <label htmlFor="id_categoria">Categoría:</label>
            <input
                type="number"
                id="id_categoria"
                name="id_categoria"
                value={productData.id_categoria}
                onChange={handleChange}
                required
            />

            <label htmlFor="stock">Stock:</label>
            <input
                type="number"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
            />

            <label htmlFor="imagen">Imagen:</label>
            <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleChange}
                accept="image/*"
            />

            <button type="submit">Crear Producto</button>
        </form>
    );
}

export default ProductForm;
