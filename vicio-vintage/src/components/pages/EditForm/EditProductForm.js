// import React, { useState, useEffect } from 'react';
// import './EditForm.css';  // Asegúrate de que el camino al CSS es correcto
// import Swal from 'sweetalert2';

// const EditProductForm = ({ product }) => {
//     const [productData, setProductData] = useState({
//         nombre: '',
//         descripcion: '',
//         precio: '',
//         id_categoria: '',
//         stock: '',
//         talla: '',
//         imagen: null
//     });

//     console.log(product)

//     // Inicializar el formulario con los datos del producto cuando el componente reciba el producto
//     useEffect(() => {
//         if (product) {
//             setProductData({
//                 nombre: product.nombre,
//                 descripcion: product.descripcion,
//                 precio: product.precio,
//                 id_categoria: product.id_categoria,
//                 stock: product.stock,
//                 talla: product.talla,
//                 imagen: null  // Asumiendo que las imágenes se manejan por separado
//             });
//         }
//     }, [product]);

//     const handleChange = (event) => {
//         const { name, value, files } = event.target;
//         setProductData(prevState => ({
//             ...prevState,
//             [name]: name === 'imagen' ? files[0] : value
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         Object.keys(productData).forEach(key => {
//             formData.append(key, productData[key]);
//         });

//         try {
//             const response = await fetch(`http://localhost:3002/api/products/${product.id_producto}`, {
//                 method: 'PUT',
//                 body: formData
//             });
//             if (!response.ok) throw new Error('Network response was not ok');
//             Swal.fire(
//                 'Updated!',
//                 'Your product has been updated.',
//                 'success'
//             );
//             window.location.reload(); // Recargar la página para reflejar los cambios
//         } catch (error) {
//             console.error('Error updating product:', error);
//             Swal.fire(
//                 'Error!',
//                 'Failed to update the product.',
//                 'error'
//             );
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="edit-product-form">
//             <label htmlFor="nombre">Nombre:</label>
//             <input
//                 type="text"
//                 id="nombre"
//                 name="nombre"
//                 value={productData.nombre}
//                 onChange={handleChange}
//                 required
//             />

//             <label htmlFor="descripcion">Descripción:</label>
//             <textarea
//                 id="descripcion"
//                 name="descripcion"
//                 value={productData.descripcion}
//                 onChange={handleChange}
//             />

//             <label htmlFor="precio">Precio:</label>
//             <input
//                 type="number"
//                 id="precio"
//                 name="precio"
//                 value={productData.precio}
//                 onChange={handleChange}
//                 required
//             />

//             <label htmlFor="id_categoria">Categoría:</label>
//             <input
//                 type="number"
//                 id="id_categoria"
//                 name="id_categoria"
//                 value={productData.id_categoria}
//                 onChange={handleChange}
//                 required
//             />

//             <label htmlFor="stock">Stock:</label>
//             <input
//                 type="number"
//                 id="stock"
//                 name="stock"
//                 value={productData.stock}
//                 onChange={handleChange}
//             />

//             <label htmlFor="imagen">Imagen:</label>
//             <input
//                 type="file"
//                 id="imagen"
//                 name="imagen"
//                 onChange={handleChange}
//                 accept="image/*"
//             />

//             <button type="submit">Actualizar Producto</button>
//         </form>
//     );
// };

// export default EditProductForm;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './EditForm.css';  // Asegúrate de que el camino al CSS es correcto

const EditProductForm = ({ product }) => {
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        stock: '',
        talla: '',
        imagen: null
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product) {
            setProductData({
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                id_categoria: product.id_categoria,
                stock: product.stock,
                talla: product.talla
            });
            setImages(product.imagenes || []);
        }
    }, [product]);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: name === 'imagen' ? files[0] : value
        }));
    };

    const handleDeleteImage = async (imageId) => {
        try {
            const response = await fetch(`http://localhost:3002/api/products/images/${imageId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete the image');
            setImages(prev => prev.filter(img => img.id !== imageId));
            Swal.fire('Deleted!', 'The image has been deleted.', 'success');
        } catch (error) {
            console.error('Error deleting image:', error);
            Swal.fire('Error!', 'Failed to delete the image.', 'error');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(productData).forEach(key => {
            formData.append(key, productData[key]);
        });

        try {
            const response = await fetch(`http://localhost:3002/api/products/${product.id_producto}`, {
                method: 'PUT',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            Swal.fire('Updated!', 'Your product has been updated.', 'success');
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire('Error!', 'Failed to update the product.', 'error');
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
            <div className="image-preview-container">
                {images.map(image => (
                    <div key={image.id} className="image-preview">
                        <img src={`http://localhost:3002/img/products/${image.url}`} alt={product.nombre} className='editimage'/>
                        <button type="button" onClick={() => handleDeleteImage(image.id)}>Borrar</button>
                    </div>
                ))}
            </div>

            <button type="submit">Actualizar Producto</button>
        </form>
    );
};

export default EditProductForm;

