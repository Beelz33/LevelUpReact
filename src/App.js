import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes y Páginas (Públicas)
// ... (imports públicos existentes) ...
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Comunidad from './pages/Comunidad';
import Soporte from './pages/Soporte';
import Carrito from './pages/Carrito';
import Logueo from './pages/Logueo';
import Perfil from './pages/Perfil';
import Registro from './pages/Registro';
import ProductoDetalle from './pages/ProductoDetalle';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import PagoError from './pages/PagoError';
import RutaProtegida from './components/RutaProtegida';

// Componentes y Páginas (Admin)
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminProductoNuevo from './pages/admin/AdminProductoNuevo';
import AdminProductoEditar from './pages/admin/AdminProductoEditar';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminUsuarioNuevo from './pages/admin/AdminUsuarioNuevo';
import AdminUsuarioEditar from './pages/admin/AdminUsuarioEditar';
// ¡NUEVO! Importa las páginas de Órdenes
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminOrdenDetalle from './pages/admin/AdminOrdenDetalle';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          {/* ... (rutas públicas existentes) ... */}
           <Route path="/" element={ <Inicio /> } />
          <Route path="/catalogo" element={ <Catalogo /> } />
          <Route path="/productos/:id" element={ <ProductoDetalle /> } />
          <Route path="/comunidad" element={ <Comunidad /> } />
          <Route path="/soporte" element={ <Soporte /> } />
          <Route path="/carrito" element={ <Carrito /> } />
          <Route path="/checkout" element={ <Checkout /> } />
          <Route path="/compra-exitosa" element={ <CompraExitosa /> } />
          <Route path="/pago-error" element={ <PagoError /> } />
          <Route path="/logueo" element={ <Logueo /> } />
          <Route path="/registro" element={ <Registro /> } />


          {/* --- RUTAS PRIVADAS (Usuario) --- */}
          <Route path="/perfil" element={ <RutaProtegida><Perfil /></RutaProtegida> } />

          {/* --- RUTAS PRIVADAS (Admin) --- */}
          <Route path="/admin" element={ <RutaProtegida adminOnly={true}><AdminLayout /></RutaProtegida> }>
            {/* Rutas Anidadas */}
            <Route index element={ <AdminDashboard /> } />
            {/* Productos */}
            <Route path="productos" element={ <AdminProductos /> } />
            <Route path="productos/nuevo" element={ <AdminProductoNuevo /> } />
            <Route path="productos/editar/:id" element={ <AdminProductoEditar /> } />
            {/* Usuarios */}
            <Route path="usuarios" element={ <AdminUsuarios /> } />
            <Route path="usuarios/nuevo" element={ <AdminUsuarioNuevo /> } />
            <Route path="usuarios/editar/:id" element={ <AdminUsuarioEditar /> } />
            {/* ¡NUEVO! Rutas de Órdenes */}
            <Route path="ordenes" element={ <AdminOrdenes /> } />
            <Route path="ordenes/:id" element={ <AdminOrdenDetalle /> } />
          </Route>

        </Routes>
      </main>

      <div className="bg-dark text-light py-4 mt-5"> {/* Footer */} </div>
    </>
  );
}

export default App;