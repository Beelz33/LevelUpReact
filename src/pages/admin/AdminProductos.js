import React, { useState, useEffect } from 'react';
// ¡NUEVO! Asegúrate de que Link esté importado
import { Link } from 'react-router-dom'; 
import { getProducts, deleteProduct } from '../../services/api'; 

function AdminProductos() {
  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // Añadido estado de error

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(''); // Limpia errores al recargar
      const data = await getProducts();
      // Validar que data sea un array
      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        console.error("API did not return an array:", data);
        setProductos([]); // Establece array vacío si la data no es válida
        setError('Error al cargar productos: formato inválido.');
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError('No se pudieron cargar los productos.');
      setProductos([]); // Asegura array vacío en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); 

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        setError(''); // Limpia error antes de intentar borrar
        await deleteProduct(id); 
        setProductos(prevProductos => prevProductos.filter(p => p.id !== id)); // Actualiza estado usando función callback
        alert('¡Producto eliminado!');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        setError('Error al eliminar el producto.'); // Muestra error al usuario
        alert('Error al eliminar producto.');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Muestra el error si existe
  if (error) {
      return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Productos ({productos.length})</h2>
        
        {/* ¡CORREGIDO! Reemplazamos <button> por <Link> */}
        <Link to="/admin/productos/nuevo" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i>
          Nuevo Producto 
        </Link>

      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              {/* (Opcional) Puedes añadir la categoría si la tienes en tus datos */}
              {/* <th>Categoría</th> */} 
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeo Seguro: Verifica que productos sea un array */}
            {Array.isArray(productos) && productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>
                  <img src={prod.img} alt={prod.nombre} style={{width:'50px', height:'50px', objectFit:'cover'}} />
                </td>
                <td>{prod.nombre}</td>
                {/* <td>{prod.categoria}</td> */}
                <td>{prod.precioTexto}</td>
                <td>{prod.stock}</td>
                <td>
                  {/* ¡CORREGIDO! Botón Editar también usa <Link> */}
                  <Link to={`/admin/productos/editar/${prod.id}`} className="btn btn-primary btn-sm me-2">
                    <i className="bi bi-pencil-fill"></i> Editar
                  </Link>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(prod.id)}
                  >
                    <i className="bi bi-trash-fill"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProductos;