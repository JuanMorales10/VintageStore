// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Card from '../Card/Card';
// import './ProductList.css';
// import NavBar from '../NavBar/NavBar';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [categoryName, setCategoryName] = useState('');
//     const [subcategories, setSubcategories] = useState([]);
//     const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
//     const [loading, setLoading] = useState(true);

//     const { categoryId } = useParams();

//     // Carga inicial de categorías y subcategorías
//     useEffect(() => {
//         const fetchCategoryDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3002/api/products/categoria/${categoryId}`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch category details, status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setCategoryName(data.categoryName);
//                 setSubcategories(data.subcategories || []);
//                 setProducts(data.products); // Carga todos los productos inicialmente
//             } catch (error) {
//                 console.error('Error fetching category details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCategoryDetails();
//     }, [categoryId]);

//     // Carga de productos según la subcategoría seleccionada
//     useEffect(() => {
//         if (!selectedSubcategoryId) return; // No hacer nada si no hay subcategoría seleccionada

//         setLoading(true);
//         const fetchProducts = async () => {
//             try {
//                 const url = `http://localhost:3002/api/products/categoria/${categoryId}/subcategoria/${selectedSubcategoryId}`;
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch products, status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setProducts(data.products);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [selectedSubcategoryId, categoryId]);

//     const handleSubcategoryChange = (event) => {
//         setSelectedSubcategoryId(event.target.value);
//     };

//     return (
//         <>
//             <NavBar />
//             <section className="product-list">
//                 <h2 className='tit'>{categoryName}</h2>
//                 <div className='pa'>
//                     <select onChange={handleSubcategoryChange} value={selectedSubcategoryId || ''}>
//                         <option value="">Seleccione una Subcategoria</option>
//                         {subcategories.map(sub => (
//                             <option key={sub.id_categoria} value={sub.id_categoria}>{sub.nombre}</option>
//                         ))}
//                     </select>
//                 </div>
//                 {loading ? (
//                     <p>Cargando...</p>
//                 ) : products.length > 0 ? (
//                     <div className="products-container">
//                         {products.map((product) => (
//                             <Card key={product.id} {...product} />
//                         ))}
//                     </div>
//                 ) : (
//                     <p className='p'>No hay productos encontrados en esta subcategoría.</p>
//                 )}
//             </section>
//         </>
//     );
// };

// export default ProductList;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './ProductList.css';
import NavBar from '../NavBar/NavBar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    // Carga inicial de categorías y subcategorías
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/products/categoria/${categoryId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch category details, status: ${response.status}`);
                }
                const data = await response.json();
                setCategoryName(data.categoryName);
                setSubcategories(data.subcategories || []);
                setProducts(data.products); // Carga todos los productos inicialmente
            } catch (error) {
                console.error('Error fetching category details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryDetails();
    }, [categoryId]);

    // Carga de productos según la subcategoría seleccionada
    useEffect(() => {
        if (!selectedSubcategoryId) return; // No hacer nada si no hay subcategoría seleccionada

        setLoading(true);
        const fetchProducts = async () => {
            try {
                const url = `http://localhost:3002/api/products/categoria/${categoryId}/subcategoria/${selectedSubcategoryId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products, status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedSubcategoryId, categoryId]);

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategoryId(event.target.value);
    };

    return (
        <>
            <NavBar />
            <section className="product-list">
                <h2 className='tit'>{categoryName}</h2>
                <div className='pa'>
                    {subcategories.length > 0 && (
                        <select onChange={handleSubcategoryChange} value={selectedSubcategoryId || ''}>
                            <option value="">Seleccione una Subcategoria</option>
                            {subcategories.map(sub => (
                                <option key={sub.id_categoria} value={sub.id_categoria}>{sub.nombre}</option>
                            ))}
                        </select>
                    )}
                </div>
                {loading ? (
                    <p>Cargando...</p>
                ) : products.length > 0 ? (
                    <div className="products-container">
                        {products.map((product) => (
                            <Card key={product.id} {...product} />
                        ))}
                    </div>
                ) : (
                    <p className='p'>No hay productos encontrados en esta subcategoría.</p>
                )}
            </section>
        </>
    );
};

export default ProductList;
