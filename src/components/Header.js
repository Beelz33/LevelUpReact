import React from 'react';
// 1. Importa 'Link' y 'useNavigate' para la redirección
import { Link, useNavigate } from 'react-router-dom';
// 2. Importa el hook del carrito
import { useCart } from '../context/CartContext';
// 3. ¡Importa el hook de autenticación!
import { useAuth } from '../context/AuthContext';

function Header() {
  // 4. Trae los items del carrito
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // 5. Trae el usuario actual y la función 'logout'
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // 6. Crea la función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Llama a la función del contexto
    navigate('/'); // Redirige al inicio
    alert('Has cerrado sesión.'); // Feedback al usuario
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        
        <Link className="navbar-brand logo" to="/">
          <img src="https://fbi.cults3d.com/uploaders/24128271/illustration-file/2cfe7f9e-5cee-4494-9b63-4e025faf1039/Honeyview_Honeyview_0.png" alt="Logo" className="logo-img" />
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/comunidad">Comunidad</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/soporte">Soporte</Link></li>
            
            {/* 7. ¡AQUÍ ESTÁ LA MAGIA! (Renderizado Condicional) */}
            {currentUser ? (
              // 7a. Si 'currentUser' EXISTE (usuario logueado)
              <>
                <li className="nav-item">
                  <Link className="nav-link text-info" to="/perfil">
                    <i className="bi bi-person-circle me-1"></i>
                    {currentUser.nombre || currentUser.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              // 7b. Si 'currentUser' es NULL (usuario no logueado)
              <li className="nav-item" id="nav-login-btn">
                <Link className="btn btn-success ms-2" to="/logueo">
                  Registro/Login
                </Link>
              </li>
            )}

            {/* El icono del carrito sigue igual */}
            <li className="nav-item position-relative ms-2">
              <Link className="nav-link" to="/carrito">
                <i className="bi bi-cart3 fs-4"></i>
                <span 
                  id="cart-badge" 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                  style={{
                    fontSize: '0.8rem', 
                    display: totalItems > 0 ? 'inline' : 'none' 
                  }}
                >
                  {totalItems}
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;