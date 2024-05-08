import React, { useState, useEffect } from 'react';
import './Dashboard.css';  // Asegúrate de que el archivo CSS está en la misma carpeta y correctamente nombrado
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <h1>Dashboard de Administración</h1>
            <ProductList />
        </div>
    );
};

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/products');
            const data = await response.json();

            
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3002/api/products/${id}`, { method: 'DELETE' });
            setProducts(products.filter(product => product.id !== id));

            navigate(`/admin/dashboard`);
        } catch (error) {
            setError('Failed to delete the product');
        }
    };

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`);
    };

    // Agrupar productos por categoría
    const groupedProducts = products.reduce((acc, product) => {
        acc[product.categoria.nombre] = [...(acc[product.categoria.nombre] || []), product];
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedProducts).length > 0 ? Object.entries(groupedProducts).map(([category, products]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className="product-container">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
                        ))}
                    </div>
                </div>
            )) : <p>No hay productos disponibles.</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

const ProductCard = ({ product, onDelete, onEdit }) => {

    console.log(product)

    return (
        <div className="product-card">
            <img src={`http://localhost:3002/img/products/${product.imagenes[0]?.url}`} alt={product.name} className="product-image" />
            <div className="card-body">
                <h4 className="card-title">{product.nombre}</h4>
                <p className="card-price">${product.precio}</p>
                <button className="edit-button" onClick={() => onEdit(product.id_producto)}>Editar</button>
                <button className="delete-button" onClick={() => onDelete(product.id_producto)}>Eliminar</button>
            </div>
        </div>
    );
};

export default DashboardPage;
