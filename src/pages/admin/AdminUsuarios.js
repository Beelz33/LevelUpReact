import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. Importa las funciones de API para usuarios
import { getUsers, deleteUser } from '../../services/api';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carga inicial de usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getUsers();
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios([]);
        setError('Error al cargar usuarios: formato inválido.');
      }
    } catch (err) {
      setError('No se pudieron cargar los usuarios.');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar el borrado
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        setError('');
        await deleteUser(id);
        setUsuarios(prevUsuarios => prevUsuarios.filter(user => user.id !== id));
        alert('¡Usuario eliminado!');
      } catch (err) {
         // Captura el error específico (ej. no borrar admin)
        const errorMessage = typeof err === 'string' ? err : 'Error al eliminar el usuario.';
        setError(errorMessage);
        alert(errorMessage);
        console.error('Error al eliminar usuario:', err);
      }
    }
  };

  // --- Renderizado ---
  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>} {/* Muestra errores */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Usuarios ({usuarios.length})</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-success">
          <i className="bi bi-plus-circle me-1"></i>
          Nuevo Usuario
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre || '-'}</td>
                <td>{user.apellido || '-'}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/usuarios/editar/${user.id}`} className="btn btn-sm btn-primary me-2">
                    Editar
                  </Link>
                  {/* Evita mostrar el botón de borrar para el admin ID 1 */}
                  {user.id !== 1 && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Eliminar
                      </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsuarios;