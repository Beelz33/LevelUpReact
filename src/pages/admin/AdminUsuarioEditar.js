import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminUsuarioForm from '../../components/admin/AdminUsuarioForm';
import { getUserById, updateUser } from '../../services/api';

function AdminUsuarioEditar() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState(null); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Evitar editar al admin principal (ID 1)
      if (parseInt(id) === 1) {
          setError('No se puede editar al administrador principal.');
          setLoading(false);
          setInitialData({}); // Evita error de null
          return;
      }
      try {
        setLoading(true);
        setError('');
        const data = await getUserById(id);
        setInitialData(data);
      } catch (err) {
        setError('No se pudo cargar el usuario para editar.');
        setInitialData(null); 
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]); 

  const handleUpdate = async (formData) => {
    try {
      setLoading(true); 
      setError('');
      await updateUser(id, formData); 
      alert('¡Usuario actualizado con éxito!');
      navigate('/admin/usuarios'); 
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Error al actualizar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) return <p>Cargando datos del usuario...</p>;
  // Muestra error si no se pudo cargar o si es el admin ID 1
  if (error || !initialData || parseInt(id) === 1) {
      return <div className="alert alert-danger">{error || 'No se puede editar este usuario.'}</div>;
  }

  return (
    <div>
      <h2>Editar Usuario (ID: {id})</h2>
      <AdminUsuarioForm 
        initialData={initialData} 
        onSubmit={handleUpdate}
        isEditing={true} 
      />
      {loading && <p>Guardando cambios...</p>}
    </div>
  );
}

export default AdminUsuarioEditar;