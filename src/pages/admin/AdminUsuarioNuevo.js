import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminUsuarioForm from '../../components/admin/AdminUsuarioForm';
import { createUser } from '../../services/api';

function AdminUsuarioNuevo() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    // Validar contraseña al crear
    if (!formData.password) {
        setError('La contraseña es requerida para crear un usuario.');
        return;
    }
    try {
      setLoading(true);
      setError('');
      await createUser(formData); 
      alert('¡Usuario creado con éxito!');
      navigate('/admin/usuarios'); 
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Error al crear el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nuevo Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <AdminUsuarioForm onSubmit={handleCreate} />
      {loading && <p>Creando usuario...</p>}
    </div>
  );
}

export default AdminUsuarioNuevo;