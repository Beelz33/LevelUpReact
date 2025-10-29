import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext'; // Asegúrate de tener esto

function ProductoDetalle() {
  
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true); // Empezamos en 'true'

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Ponemos 'loading' en true al empezar a buscar
        const data = await getProductById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setProducto(null); 
      } finally {
        setLoading(false); // Quitamos 'loading' al terminar (con éxito o error)
      }
    };

    fetchProduct();
  }, [id]); 

  // GUARDIA 1: Estado de Carga
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-light">Cargando producto...</h2>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // GUARDIA 2: Estado de Producto No Encontrado
  if (!producto) {
    return (
      <div className="container mt-5 text-center alert alert-danger">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o no se pudo cargar.</p>
        <Link to="/catalogo" className="btn btn-primary">Volver al Catálogo</Link>
      </div>
    );
  }



  const handleAddToCart = () => {
    addToCart(producto);
    alert('¡Producto agregado al carrito!');
  };

  return (
    <div className="container mt-4" id="productoDetalle">
      <div className="row">
        <div className="col-md-6">
          <img src={producto.img} className="img-fluid rounded" alt={producto.nombre} />
        </div>
        <div className="col-md-6">
          <h2>{producto.nombre}</h2> 
          <p className="text-success fs-3">{producto.precioTexto}</p>
          <p>{producto.descripcion}</p>
          <div className="d-grid gap-2">
            <button 
              id="btn-agregar-carrito" 
              className="btn btn-success btn-lg"
              onClick={handleAddToCart} 
            >
              Agregar al carrito
            </button>
            <Link to="/catalogo" className="btn btn-outline-light">Seguir comprando</Link>
          </div>
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-body">
          <h4>Origen y Garantía</h4>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Fabricante:</strong> {producto.fabricante}</p>
              <p><strong>Procedencia:</strong> {producto.procedencia}</p>
              <p><strong>Distribuidor:</strong> {producto.distribuidor}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Garantía:</strong> {producto.garantia}</p>
              <p><strong>Autenticidad:</strong> {producto.autenticidad}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;