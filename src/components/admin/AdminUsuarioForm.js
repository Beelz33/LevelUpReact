import React, { useState } from 'react'; // Eliminamos useEffect por ahora

function AdminUsuarioForm({ initialData = {}, onSubmit, isEditing = false }) {

  // Inicializa el estado DIRECTAMENTE usando initialData
  // Asegúrate de que la contraseña siempre empiece vacía
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || '',
    apellido: initialData.apellido || '',
    email: initialData.email || '',
    role: initialData.role || 'customer',
    password: '', // La contraseña siempre inicia vacía en el formulario
  });

  // Eliminamos el useEffect que causaba el bucle infinito
  // Eliminamos el useEffect y estado irrelevantes para cargar categorías

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData };
    // Solo eliminamos la propiedad 'password' si estamos editando Y el campo está vacío
    if (isEditing && !dataToSend.password) {
      delete dataToSend.password;
    }
    onSubmit(dataToSend);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo Nombre */}
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>
      {/* Campo Apellido */}
      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">Apellido</label>
        <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
      </div>
      {/* Campo Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      {/* Campo Contraseña (SOLO al crear) */}
      {!isEditing && (
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required={!isEditing} placeholder="Ingresar nueva contraseña"/>
        </div>
      )}
       {/* Campo Contraseña (Opcional al EDITAR para cambiarla) */}
       {isEditing && (
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nueva Contraseña (Opcional)</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Dejar en blanco para no cambiar"/>
           <div id="passwordHelpBlock" className="form-text">
            Si dejas este campo en blanco, la contraseña actual no se modificará.
          </div>
        </div>
      )}
      {/* Campo Rol */}
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Rol</label>
        <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="customer">Cliente (Customer)</option>
          <option value="admin">Administrador (Admin)</option>
        </select>
      </div>
      {/* Botón Enviar */}
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
      </button>
    </form>
  );
}

export default AdminUsuarioForm;