import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Carrito() {
  
  // 2. Trae los items Y las funciones para modificar el carrito
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // 3. Calcula el total
  const totalGeneral = cartItems.reduce((sum, item) => sum + (item.precio * item.qty), 0);

  // 4. GUARDIA: Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <main>
        <section className="container mt-4 text-center">
          <h1 className="mb-4">Carrito de Compras</h1>
          <div className="alert alert-info">Tu carrito está vacío.</div>
          <div className="mb-3">
            <Link to="/catalogo" className="btn btn-outline-primary me-2">Volver al Catálogo</Link>
            <Link to="/" className="btn btn-outline-secondary">Ir al Inicio</Link>
          </div>
        </section>
      </main>
    );
  }

  // 5. Si el carrito TIENE items, muestra la tabla
  return (
    <main>
      <section className="container mt-4">
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        <div className="mb-3 text-center">
          <Link to="/catalogo" className="btn btn-outline-primary me-2">Volver al Catálogo</Link>
        </div>
        
        <div id="carritoContainer">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* 6. Mapeamos los items del carrito a filas de la tabla */}
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.nombre} style={{width:'60px', maxHeight:'60px', objectFit:'cover', marginRight:'10px'}} />
                    {item.nombre}
                  </td>
                  <td className="text-center">
                    {/* 7. Conectamos los botones de cantidad */}
                    <button 
                      className="btn btn-sm btn-outline-light me-2"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.qty}</span>
                    <button 
                      className="btn btn-sm btn-outline-light ms-2"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>${(item.precio * item.qty).toLocaleString('es-CL')}</td>
                  <td>
                    {/* 8. Conectamos el botón de eliminar */}
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">Total</th>
                <th colSpan="2">${totalGeneral.toLocaleString('es-CL')}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="d-flex justify-content-center my-4">
          {/* 9. Este botón <Link> nos llevará al Checkout (que aún no creamos) */}
          <Link 
            to="/checkout" 
            className="btn btn-success btn-lg px-5 py-3 fw-bold fs-2 shadow" 
            style={{ letterSpacing: '2px' }}
          >
            PAGAR
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Carrito;