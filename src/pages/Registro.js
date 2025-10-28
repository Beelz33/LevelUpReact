import React, { useState } from 'react';
// 1. Importa Link y useNavigate
import { Link, useNavigate } from 'react-router-dom';
// 2. Importa el hook de autenticación
import { useAuth } from '../context/AuthContext';

function Registro() {
  
  // 3. Estado único para TODOS los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirm: '', // ¡Campo nuevo!
    nacimiento: '',
    codigoReferido: ''
  });

  // 4. Estados para errores y carga
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 5. Traemos 'register' y 'navigate'
  const { register } = useAuth();
  const navigate = useNavigate();

  // 6. Función genérica para actualizar el estado del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // 7. Función para manejar el envío
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    // 8. ¡Validación de Contraseña!
    if (formData.password !== formData.passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return; // Detiene la ejecución
    }

    try {
      setError('');
      setLoading(true);
      
      // 9. Llama a la función 'register' de nuestro AuthContext
      await register(formData);
      
      // 10. Si tiene éxito, felicita y redirige al Perfil
      alert('¡Registro exitoso! Bienvenido a Level-Up.');
      navigate('/perfil');

    } catch (err) {
      // 11. Muestra el error de la API (ej. "El correo ya existe")
      setError(err.message || 'Error al crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 bg-dark">
              <h2 className="text-center mb-4 text-light">Crear Cuenta</h2>
              
              {/* 12. Conectamos el formulario */}
              <form id="registroForm" onSubmit={handleSubmit}>
                
                {/* 13. Mostramos el error si existe */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="nombre">Nombre completo</label>
                  {/* 14. Conectamos todos los inputs */}
                  <input type="text" className="form-control bg-dark text-light" id="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="email">Correo electrónico</label>
                  <input type="email" className="form-control bg-dark text-light" id="email" value={formData.email} onChange={handleChange} required />
                  <div className="form-text text-light">Si usas correo @duocuc.cl, tendrás 20% de descuento</div>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="password">Contraseña</label>
                  <input type="password" className="form-control bg-dark text-light" id="password" value={formData.password} onChange={handleChange} required />
                </div>
                
                {/* 15. CAMPO NUEVO: Confirmar Contraseña */}
                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="passwordConfirm">Confirmar Contraseña</label>
                  <input type="password" className="form-control bg-dark text-light" id="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="nacimiento">Fecha de nacimiento</label>
                  <input type="date" className="form-control bg-dark text-light" id="nacimiento" value={formData.nacimiento} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light" htmlFor="codigoReferido">Código de referido (opcional)</label>
                  <input type="text" className="form-control bg-dark text-light" id="codigoReferido" maxLength="12" placeholder="Ej: LEVEL-XXXXXX" value={formData.codigoReferido} onChange={handleChange} />
                  <div className="form-text text-light">Si tienes un código de invitación, ingrésalo aquí para ganar puntos.</div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="terminos" required />
                  <label className="form-check-label text-light" htmlFor="terminos">Acepto los términos y condiciones</label>
                </div>
                
                {/* 16. Conectamos el botón al estado 'loading' */}
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </form>
              <div id="registroMsg" className="mt-3 text-light"></div>
              <p className="mt-3 text-center text-light">
                ¿Ya tienes cuenta? <Link to="/logueo" className="text-success">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registro;