import React from 'react';
// 1. Importa 'Outlet' y 'Link'
import { Outlet, Link } from 'react-router-dom';
import './AdminLayout.css'; // (Crearemos este CSS en el siguiente paso)

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* 2. Barra Lateral (Sidebar) - Basada en Figura 9 */}
      <nav className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h5>Panel Admin</h5>
        </div>
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/productos">Productos</Link>
          </li>
          <li>
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
          <li>
            <Link to="/admin/ordenes">Órdenes</Link>
          </li>
          <li>
            <Link to="/perfil">Mi Perfil</Link>
          </li>
          <li>
            <Link to="/">Ver Tienda</Link>
          </li>
        </ul>
      </nav>

      {/* 3. Área de Contenido Principal */}
      <div className="admin-content">
        {/* 'Outlet' es el "agujero" donde React Router 
            renderizará las páginas anidadas (Dashboard, Productos, etc.) */}
        <Outlet /> 
      </div>
    </div>
  );
}

export default AdminLayout;