import React from 'react';
import { Link } from 'react-router-dom';

function CompraExitosa() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-4" style={{maxWidth: '600px', margin: 'auto'}}>
        <span style={{fontSize: '4rem'}}>✅</span>
        <h1 className="text-success mt-3">¡Pago realizado con éxito!</h1>
        <p className="lead" style={{color: 'var(--color-azul-oscuro)'}}>
          Orden nro #20240705 (Simulada)
        </p>
        <p style={{color: 'var(--color-gris-oscuro)'}}>
          Gracias por tu compra. Hemos enviado un resumen a tu correo electrónico.
          En tu perfil podrás ver el historial de tus compras.
        </p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-2">Ir al Inicio</Link>
          <Link to="/catalogo" className="btn btn-outline-secondary">Seguir comprando</Link>
        </div>
      </div>
    </div>
  );
}

export default CompraExitosa;