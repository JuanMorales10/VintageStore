// import React, { useState, useEffect } from 'react';
// import './ProductForm.css';

// function ProductForm() {
//     const [categorias, setCategorias] = useState([]);
//     const [subcategorias, setSubcategorias] = useState([]);
//     const [selectedCategoria, setSelectedCategoria] = useState('');
//     const [productData, setProductData] = useState({
//         nombre: '',
//         descripcion: '',
//         precio: '',
//         id_categoria: '',
//         stock: '',
//         talla: '',
//         imagenes: []
//     });

//     useEffect(() => {
//         fetch('http://localhost:3002/api/categorias')
//             .then(response => response.json())
//             .then(data => {
//                 setCategorias(data.filter(cat => !cat.categoriaPadreId)); // Filtrar solo categorías principales
//             })
//             .catch(error => console.error('Error fetching categories:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedCategoria) {
//             fetch(`http://localhost:3002/api/categorias/${selectedCategoria}/subcategorias`)
//                 .then(response => response.json())
//                 .then(data => setSubcategorias(data))
//                 .catch(error => console.error('Error fetching subcategories:', error));
//         } else {
//             setSubcategorias([]);
//         }
//     }, [selectedCategoria]);

//     const handleCategoriaChange = (event) => {
//         setSelectedCategoria(event.target.value);
//         setProductData({ ...productData, id_categoria: event.target.value });
//     };

//     const handleChange = (event) => {
//         const { name, value, files } = event.target;
//         if (name === "imagenes") {
//             setProductData({
//                 ...productData,
//                 [name]: files
//             });
//         } else {
//             setProductData({ ...productData, [name]: value });
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         Object.keys(productData).forEach(key => {
//             if (key === "imagenes") {
//                 Array.from(productData[key]).forEach(file => {
//                     formData.append(key, file);  // Añade cada archivo de imagen al formData
//                 });
//             } else {
//                 formData.append(key, productData[key]);
//             }
//         });

//         try {
//             const response = await fetch('http://localhost:3002/api/products', {
//                 method: 'POST',
//                 body: formData
//             });
//             if (!response.ok) throw new Error('Network response was not ok');
//             const result = await response.json();
//             console.log('Success:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="nombre">Nombre:</label>
//             <input type="text" id="nombre" name="nombre" value={productData.nombre} onChange={handleChange} required />

//             <label htmlFor="descripcion">Descripción:</label>
//             <textarea id="descripcion" name="descripcion" value={productData.descripcion} onChange={handleChange} />

//             <label htmlFor="precio">Precio:</label>
//             <input type="number" id="precio" name="precio" value={productData.precio} onChange={handleChange} required />

//             <label htmlFor="categoria">Categoría:</label>
//             <select id="categoria" value={selectedCategoria} onChange={handleCategoriaChange}>
//                 <option value="">Seleccione una categoría</option>
//                 {categorias.map(categoria => (
//                     <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre}</option>
//                 ))}
//             </select>

//             {selectedCategoria && subcategorias.length > 0 && (
//                 <React.Fragment>
//                     <label htmlFor="subcategoria">Subcategoría:</label>
//                     <select id="subcategoria" onChange={(e) => setProductData({ ...productData, id_categoria: e.target.value })}>
//                         <option value="">Seleccione una subcategoría</option>
//                         {subcategorias.map(sub => (
//                             <option key={sub.id_categoria} value={sub.id_categoria}>{sub.nombre}</option>
//                         ))}
//                     </select>
//                 </React.Fragment>
//             )}

//             <label htmlFor="stock">Stock:</label>
//             <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} />

//             <label htmlFor="talla">Talla:</label>
//             <select id="talla" name="talla" value={productData.talla} onChange={handleChange} required>
//                 {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(talla => (
//                     <option key={talla} value={talla}>{talla}</option>
//                 ))}
//             </select>

//             <label htmlFor="imagenes">Imágenes:</label>
//             <input type="file" id="imagenes" name="imagen" onChange={handleChange} accept="image/*" multiple />

//             <button type="submit">Crear Producto</button>
//         </form>
//     );
// }

// export default ProductForm;



import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import NavBar from '../../NavBar/NavBar';

function ProductForm() {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        id_subcategoria: '',
        stock: '',
        talla: '',
        imagen: []  // Cambiado de 'imagenes' a 'imagen'
    });

    useEffect(() => {
        fetch('http://localhost:3002/api/categorias')
            .then(response => response.json())
            .then(data => {
                setCategorias(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedCategoria) {
            fetch(`http://localhost:3002/api/categorias/${selectedCategoria}/subcategorias`)
                .then(response => response.json())
                .then(data => {
                    setSubcategorias(data);
                    if (!data.length) {
                        setSelectedSubcategoria('');
                    }
                })
                .catch(error => console.error('Error fetching subcategories:', error));
        } else {
            setSubcategorias([]);
        }
    }, [selectedCategoria]);

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
        setProductData({ ...productData, id_categoria: event.target.value });
    };

    const handleSubcategoriaChange = (event) => {
        setSelectedSubcategoria(event.target.value);
        setProductData({ ...productData, id_subcategoria: event.target.value });
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "imagen") {  // Cambiado de 'imagenes' a 'imagen'
            setProductData({
                ...productData,
                [name]: files
            });
        } else {
            setProductData({ ...productData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (const key in productData) {
            if (key === 'imagen') {  // Cambiado de 'imagenes' a 'imagen'
                Array.from(productData[key]).forEach(file => {
                    formData.append('imagen', file);  // Cambiado de 'imagenes' a 'imagen'
                });
            } else {
                formData.append(key, productData[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:3002/api/products', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Producto creado:', result);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <>
        <NavBar />
        <form onSubmit={handleSubmit} className='formcreate'>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={productData.nombre} onChange={handleChange} required />

            <label htmlFor="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" value={productData.descripcion} onChange={handleChange} />

            <label htmlFor="precio">Precio:</label>
            <input type="number" id="precio" name="precio" value={productData.precio} onChange={handleChange} required />

            <label htmlFor="categoria">Categoría:</label>
            <select id="categoria" value={selectedCategoria} onChange={handleCategoriaChange}>
                <option value="">Seleccione una categoría</option>
                {categorias.map(categoria => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre}</option>
                ))}
            </select>

            {subcategorias.length > 0 && (
                <React.Fragment>
                    <label htmlFor="subcategoria">Subcategoría:</label>
                    <select id="subcategoria" value={selectedSubcategoria} onChange={handleSubcategoriaChange}>
                        <option value="">Seleccione una subcategoría</option>
                        {subcategorias.map(sub => (
                            <option key={sub.id_categoria} value={sub.id_categoria}>{sub.nombre}</option>
                        ))}
                    </select>
                </React.Fragment>
            )}

            <label htmlFor="stock">Stock:</label>
            <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} />

            <label htmlFor="talla">Talla:</label>
            <select id="talla" name="talla" value={productData.talla} onChange={handleChange} required>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(talla => (
                    <option key={talla} value={talla}>{talla}</option>
                ))}
            </select>

            <label htmlFor="imagenes">Imágenes:</label>
            <input type="file" id="imagenes" name="imagen" onChange={handleChange} accept="image/*" multiple />

            <button type="submit">Crear Producto</button>
        </form>
                </>
    );
}

export default ProductForm;