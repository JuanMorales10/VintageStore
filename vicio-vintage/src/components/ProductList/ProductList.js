// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import Card from '../Card/Card';
// import './ProductList.css';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [categoryName, setCategoryName] = useState('');
//     const [subcategories, setSubcategories] = useState([]);
//     const [selectedSubcategory, setSelectedSubcategory] = useState('');

//     const { categoryId } = useParams();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 if (categoryId) {
//                     const response = await fetch(`http://localhost:3002/api/products/categoria/${categoryId}`);
//                     const data = await response.json();
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch products');
//                     }
//                     setProducts(data.products);
//                     setCategoryName(data.categoryName);
//                     setSubcategories(data.subcategories || []);
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [categoryId, selectedSubcategory]);

//     const handleSubcategoryChange = (event) => {
//         setSelectedSubcategory(event.target.value);
//         // Here you could trigger a new fetch or filter the displayed products based on subcategory
//     };

//     const responsive = {
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 4
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 3
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     };

//     return (
//         <section className="product-list">
//             <h2 className='tit'>{categoryName || 'Cargando...'}</h2>
//             <div className='pa'>
//             {subcategories.length > 0 && (
//                 <select onChange={handleSubcategoryChange} value={selectedSubcategory}>
//                     <option value="">All Subcategories</option>
//                     {subcategories.map(sub => (
//                         <option key={sub.id} value={sub.id}>{sub.nombre}</option>
//                     ))}
//                 </select>
//             )}
//             </div>
//             <Carousel
//                 responsive={responsive}
//                 infinite={true}
//                 autoPlay={true}
//                 autoPlaySpeed={3000}
//                 keyBoardControl={true}
//                 customTransition="all .5s"
//                 containerClass="carousel-container"
//                 removeArrowOnDeviceType={["tablet", "mobile"]}
//                 dotListClass="custom-dot-list-style"
//                 itemClass="carousel-item-padding-40-px">
//                 {products.map((product) => (
//                     <Card key={product.id} {...product} />
//                 ))}
//             </Carousel>
//         </section>
//     );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (categoryId) {
                    const response = await fetch(`http://localhost:3002/api/products/categoria/${categoryId}`);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    setProducts(data.products);
                    setCategoryName(data.categoryName);
                    setSubcategories(data.subcategories || []);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);  // Ensure loading is false after fetch
            }
        };

        fetchProducts();
    }, [categoryId, selectedSubcategory]);

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
        // Optionally trigger a new fetch or filter the displayed products based on subcategory
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className="product-list">
            <h2 className='tit'>{categoryName }</h2>
            <div className='pa'>
                {subcategories.length > 0 && (
                    <select onChange={handleSubcategoryChange} value={selectedSubcategory}>
                        <option value="">Subcategorias</option>
                        {subcategories.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                        ))}
                    </select>
                )}
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : products.length > 0 ? (
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5s"
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    {products.map((product) => (
                      <Card key={product.id} {...product} />
                    ))}
                </Carousel>
            ) : (
                <p className='p'>No hay productos encontrados en esta categoria.</p>
            )}
        </section>
    );
};

export default ProductList;


