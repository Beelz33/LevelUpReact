import React from 'react';
import { Link } from 'react-router-dom';

function PagoError() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-4" style={{maxWidth: '600px', margin: 'auto'}}>
        <span style={{fontSize: '4rem'}}>❌</span>
        <h1 className="text-danger mt-3">No se pudo realizar el pago</h1>
        <p className="lead" style={{color: 'var(--color-azul-oscuro)'}}>
          Orden nro #20240705 (Simulada)
        </p>
        <p style={{color: 'var(--color-gris-oscuro)'}}>
          Ha ocurrido un error al procesar tu pago. 
          Por favor, inténtalo de nuevo o contacta a soporte.
        </p>
        <div className="mt-4">
          {/* (El link "/checkout" te lleva a reintentar) */}
          <Link to="/checkout" className="btn btn-warning me-2">Volver a intentar el pago</Link>
          <Link to="/" className="btn btn-outline-secondary">Ir al Inicio</Link>
        </div>
      </div>
    </div>
  );
}

export default PagoError;