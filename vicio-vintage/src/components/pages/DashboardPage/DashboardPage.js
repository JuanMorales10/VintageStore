import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Asegúrate de que el archivo CSS está en la misma carpeta y correctamente nombrado
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logovintage.png'; // Ajusta la ruta según la estructura de tu proyecto
import ProductForm from './../CreateForm/ProductForm';
import Swal from 'sweetalert2';
import EditProductForm from './../EditForm/EditProductForm';


const DashboardPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    

    return (
        <div className="db-container">
            <div className="db-sidenav">
                <Link to="/">
                    <img src={logo} className="db-logosidenav" alt="Logo" />
                </Link>
                <button onClick={() => { setShowForm(false); setSelectedProduct(null); }}>Ver Productos</button>
                <button onClick={() => { setShowForm(true); setSelectedProduct(null); }}>Crear Producto</button>
            </div>
            <div className="db-content">
                <h1 className='h1db'>Vicio Vintage Dashboard</h1>
                {showForm ? <ProductForm /> : selectedProduct ? <EditProductForm product={selectedProduct} /> : <ProductList onEdit={setSelectedProduct} />}
            </div>
        </div>
    );
};

const ProductList = ({ onEdit }) => {
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
            const response = await fetch(`http://localhost:3002/api/products/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete the product');
            }
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
           Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            ); 
            navigate('/admin/dashboard')
        } catch (error) {
            setError('Failed to delete the product');
            Swal.fire(
                'Error!',
                'Failed to delete the product.',
                'error'
            );
        }
    };

    // Agrupar productos por categoría
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.categoria.nombre || 'Otros'; // Ajusta esto según cómo vengan tus datos
        acc[category] = acc[category] || [];
        acc[category].push(product);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedProducts).length > 0 ? Object.entries(groupedProducts).map(([category, items]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className="db-product-container">
                        {items.map(product => (
                            <ProductCard key={product.id_producto} product={product} onDelete={handleDelete} onEdit={onEdit} />
                        ))}
                    </div>
                </div>
            )) : <p>No hay productos disponibles.</p>}
            {error && <p>{error}</p>}
        </div>
    );
};
const ProductCard = ({ product, onDelete, onEdit }) => {
    // Usar optional chaining para manejar casos donde `imagenes` podría ser undefined o vacío.
    const imageUrl = product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : undefined;

    console.log(imageUrl);  // Verificar qué se está logueando.

    return (
        <div className="db-product-card">
            {/* Solo mostrar la imagen si `imageUrl` está definido */}
            {imageUrl && (
                <img src={`http://localhost:3002/img/products/${imageUrl}`} alt={product.nombre} className="db-product-image" />
            )}
            <div className="db-card-body">
                <h4 className="db-card-title">{product.nombre}</h4>
                <p className="db-card-price">${product.precio}</p>
                <button className="db-edit-button" onClick={() => onEdit(product)}>Editar</button>
                <button className="db-delete-button" onClick={() => onDelete(product.id_producto)}>Eliminar</button>
            </div>
        </div>
    );
};



export default DashboardPage;
