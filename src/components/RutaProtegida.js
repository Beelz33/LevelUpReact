import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Este componente ahora puede proteger rutas de usuario (por defecto)
 * o rutas de administrador (si se le pasa la prop 'adminOnly').
 */
function RutaProtegida({ children, adminOnly = false }) {
  
  const { currentUser } = useAuth();

  // 1. Protección de Usuario (Rutas normales como /perfil)
  if (!currentUser) {
    // Si NO hay usuario, siempre redirige a login
    return <Navigate to="/logueo" />;
  }

  // 2. Protección de Administrador (NUEVO)
  if (adminOnly && currentUser.role !== 'admin') {
    // Si la ruta es SÓLO para admin, pero el usuario no lo es...
    // ...lo redirigimos al inicio (no a /perfil)
    alert('No tienes permiso para acceder a esta sección.');
    return <Navigate to="/" />;
  }

  // 3. Si todo está bien, muestra la página solicitada
  return children;
}

export default RutaProtegida;