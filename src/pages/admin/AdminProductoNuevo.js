import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importa el formulario y la función 'create' de la API
import AdminProductoForm from '../../components/admin/AdminProductoForm';
import { createProduct } from '../../services/api';

function AdminProductoNuevo() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Esta es la función que se pasará al formulario
  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createProduct(formData); // Llama a la API para crear
      alert('¡Producto creado con éxito!');
      navigate('/admin/productos'); // Vuelve a la tabla
    } catch (err) {
      setError('Error al crear el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nuevo Producto</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* 3. Renderiza el formulario, pasándole la función 'handleCreate' */}
      <AdminProductoForm onSubmit={handleCreate} />
      
      {loading && <p>Creando producto...</p>}
    </div>
  );
}

export default AdminProductoNuevo;