import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './LProductList.css';

const LProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(products)

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/products/latest`);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error('Failed to fetch latest products');
                }
                setProducts(data);
            } catch (error) {
                console.error('Error fetching latest products:', error);
            } finally {
                setLoading(false);  // Ensure loading is false after fetch
            }
        };

        fetchLatestProducts();
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 764 },
            items: 3
        },
        tablet2: {
            breakpoint: { max: 764, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className="lproduct-list">
            <h2 className='tit'>Últimos Productos</h2>
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
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px">
                    {products.map((product) => (
                      <Card key={product.id} {...product} />
                    ))}
                </Carousel>
            ) : (
                <p className='p'>No hay productos encontrados.</p>
            )}
        </section>
    );
};

export default LProductList;
