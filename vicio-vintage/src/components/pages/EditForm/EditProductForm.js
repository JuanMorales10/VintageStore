import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditForm.css';  // Asegúrate de que el camino al CSS es correcto

const EditProductForm = () => {
    const { productId } = useParams(); // Usar useParams para obtener el parámetro desde la URL
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        stock: '',
        talla: '',
        imagen: null
    });

    // Cargar datos existentes del producto
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const product = await response.json();
                console.log(product)
                setProductData({
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    precio: product.precio,
                    id_categoria: product.id_categoria,
                    stock: product.stock,
                    talla: product.talla,
                    imagen: null  // Las imágenes generalmente se manejan por separado
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        if (productId) fetchData();
    }, [productId]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: name === 'imagen' ? files[0] : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });

        try {
            const response = await fetch(`http://localhost:3002/api/products/${productId}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Product updated:', result);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-product-form">
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

            <button type="submit">Actualizar Producto</button>
        </form>
    );
};

export default EditProductForm;

