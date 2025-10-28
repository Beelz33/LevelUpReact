import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// 1. Importa el formulario y las funciones 'getById' y 'update'
import AdminProductoForm from '../../components/admin/AdminProductoForm';
import { getProductById, updateProduct } from '../../services/api';

function AdminProductoEditar() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  
  // Estado para guardar los datos iniciales del producto
  const [initialData, setInitialData] = useState(null); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // 2. Carga los datos del producto a editar cuando el componente se monta
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProductById(id);
        setInitialData(data);
      } catch (err) {
        setError('No se pudo cargar el producto para editar.');
        setInitialData(null); // Asegura que no se muestre el form si hay error
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]); // Depende del ID de la URL

  // 3. Esta es la función que se pasará al formulario para guardar
  const handleUpdate = async (formData) => {
    try {
      setLoading(true); // Reusa el estado 'loading'
      setError('');
      await updateProduct(id, formData); // Llama a la API para actualizar
      alert('¡Producto actualizado con éxito!');
      navigate('/admin/productos'); // Vuelve a la tabla
    } catch (err) {
      setError('Error al actualizar el producto.');
    } finally {
      setLoading(false);
    }
  };

  // --- Renderizado ---
  if (loading && !initialData) return <p>Cargando datos del producto...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!initialData) return <div className="alert alert-warning">No se encontraron datos del producto.</div>; // Seguridad extra

  return (
    <div>
      <h2>Editar Producto (ID: {id})</h2>
      
      {/* 4. Renderiza el formulario pasándole los datos iniciales y la función 'handleUpdate' */}
      <AdminProductoForm 
        initialData={initialData} 
        onSubmit={handleUpdate}
        isEditing={true} // Le dice al form que estamos editando
      />
      
      {loading && <p>Guardando cambios...</p>}
    </div>
  );
}

export default AdminProductoEditar;