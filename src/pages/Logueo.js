import React, { useState } from 'react';
// 1. Importa Link, y también 'useNavigate' para redirigir
import { Link, useNavigate } from 'react-router-dom';
// 2. Importa nuestro hook de autenticación
import { useAuth } from '../context/AuthContext';

function Logueo() {
  
  // 3. Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 4. Estados para manejar errores y carga
  const [error, setError] = useState(''); // Para mostrar errores de la API
  const [loading, setLoading] = useState(false); // Para desactivar el botón

  // 5. Traemos la función 'login' del contexto y el 'navigate' de react-router
  const { login } = useAuth();
  const navigate = useNavigate();

  // 6. Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación simple
    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }

    try {
      setError(''); // Limpia errores anteriores
      setLoading(true); // Desactiva el botón
      
      // 7. ¡Aquí ocurre la magia!
      // Llama a la función 'login' de nuestro AuthContext
      await login(email, password);
      
      // 8. Si 'login' no da error, redirige al perfil
      navigate('/perfil'); 

    } catch (err) {
      // 9. Si 'login' da error (desde api.js), lo mostramos
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false); // Vuelve a activar el botón
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-center mb-4" style={{color: 'var(--color-azul-oscuro)'}}>Iniciar Sesión</h2>
              
              {/* 10. Conectamos la función handleSubmit */}
              <form onSubmit={handleSubmit}>
                
                {/* 11. Mostramos el error si existe */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label" style={{color: 'var(--color-azul-oscuro)'}}>Correo electrónico</label>
                  {/* 12. Conectamos el input al estado 'email' */}
                  <input 
                    type="email" 
                    className="form-control bg-dark text-light" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{color: 'var(--color-azul-oscuro)'}}>Contraseña</label>
                  {/* 13. Conectamos el input al estado 'password' */}
                  <input 
                    type="password" 
                    className="form-control bg-dark text-light" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {/* 14. Desactivamos el botón mientras 'loading' es true */}
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>
              
              <p className="mt-3 text-center" style={{color: 'var(--color-azul-oscuro)'}}>
                ¿No tienes cuenta? 
                <Link to="/registro">Regístrate aquí</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logueo;