import React, { useState } from 'react';
// 1. Importa 'useAuth' y 'useNavigate'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  
  // 2. Trae el usuario actual y la función de logout
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // 3. Rellena el estado del formulario con los datos del usuario actual
  const [formData, setFormData] = useState({
    nombre: currentUser.nombre || '',
    apellido: currentUser.apellido || '',
    correo: currentUser.email || '',
    nacimiento: currentUser.fechaNacimiento || '',
    telefono: currentUser.telefono || ''
  });

  // (Opcional) Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // (Opcional) Función para "Guardar Cambios"
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // En un proyecto real, aquí llamarías a una API 'updateUser(formData)'
    console.log("Guardando cambios:", formData);
    alert("¡Perfil actualizado! (Simulación)");
  };
  
  // 4. Conecta el botón grande de "Cerrar Sesión"
  const handleLogout = () => {
    logout();
    navigate('/');
    alert('Has cerrado sesión.');
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card perfil-card p-3 text-center" id="perfilResumen">
              {/* 5. Muestra datos dinámicos */}
              <i className="bi bi-person-circle" style={{fontSize: '4rem'}}></i>
              <h3>{currentUser.nombre} {currentUser.apellido}</h3>
              <p className="text-info">{currentUser.email}</p>
            </div>
            {/* ... (Omitimos las tarjetas de referido y canje por ahora) ... */}
          </div>
          <div className="col-md-8">
            <div className="card perfil-card p-4">
              <h4 style={{color: 'var(--color-azul-oscuro, #39FF14)'}}>Información personal</h4>
              {/* 6. Conecta el formulario */}
              <form id="perfilForm" onSubmit={handleSaveChanges}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control perfil-input" id="nombre" value={formData.nombre} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control perfil-input" id="apellido" value={formData.apellido} onChange={handleChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  {/* Hacemos el email de solo lectura, usualmente no se cambia */}
                  <input type="email" className="form-control perfil-input" id="correo" value={formData.correo} readOnly />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha de nacimiento</label>
                  <input type="date" className="form-control perfil-input" id="nacimiento" value={formData.nacimiento} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" className="form-control perfil-input" id="telefono" value={formData.telefono} onChange={handleChange} />
                </div>
                
                <button type="submit" className="btn btn-success">Guardar cambios</button>
                <div id="perfilMsg" className="mt-2"></div>
              </form>
            </div>
            {/* ... (Omitimos el historial de compras por ahora) ... */}
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          {/* 7. Conecta el botón de logout */}
          <button 
            id="cerrarSesionBtn" 
            className="btn btn-danger btn-lg px-5 py-3 fw-bold fs-2 shadow" 
            style={{ 
              letterSpacing: '2px', 
              backgroundColor: '#dc3545', 
              borderColor: '#dc3545' 
            }}
            onClick={handleLogout}
          >
            CERRAR SESIÓN
          </button>
        </div>
      </div>
    </>
  );
}

export default Perfil;