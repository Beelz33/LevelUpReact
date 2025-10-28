import React, { useState } from 'react';
// Importamos 'useNavigate' para redirigir al usuario después del pago
import { useNavigate } from 'react-router-dom'; 
// Importamos el carrito para limpiarlo y mostrar el total
import { useCart } from '../context/CartContext'; 

function Checkout() {
  // Traemos los items y la función para limpiar
  const { cartItems, clearCart } = useCart();
  // 'navigate' es la herramienta de React Router para cambiar de página
  const navigate = useNavigate(); 
  
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago', // Valor por defecto
    comuna: 'Cerrillos' // Valor por defecto
  });
  
  // Estado para simular la carga del pago
  const [isProcessing, setIsProcessing] = useState(false);

  // Función que actualiza el estado del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Función para manejar el envío (pago)
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    setIsProcessing(true); // Muestra "Procesando..."
    
    // --- Simulación de un Pago ---
    // En un proyecto real, aquí llamarías a una API de pago (ej. Stripe, PayPal).
    // Nosotros solo simularemos una espera de 2 segundos.
    setTimeout(() => {
      console.log("Pago Exitoso. Datos:", formData);
      
      // 1. Limpiamos el carrito
      clearCart();
      
      // 2. Redirigimos al usuario a la página de éxito
      navigate('/compra-exitosa');
      
    }, 2000); // Simula 2 segundos de espera
  };

  // Calculamos el total (copiado de Carrito.js)
  const totalGeneral = cartItems.reduce((sum, item) => sum + (item.precio * item.qty), 0);

  return (
    <div className="container mt-5" style={{maxWidth: '800px', color: '#fff'}}>
      <h1 className="text-center mb-4">Finalizar Compra</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="card perfil-card p-4">
          <h4 style={{color: 'var(--color-azul-oscuro, #39FF14)'}}>Información del cliente</h4>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control perfil-input" id="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="apellidos" className="form-label">Apellidos</label>
              <input type="text" className="form-control perfil-input" id="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control perfil-input" id="correo" value={formData.correo} onChange={handleChange} required />
          </div>

          <h4 className="mt-4" style={{color: 'var(--color-azul-oscuro, #39FF14)'}}>Dirección de entrega de los productos</h4>
          <div className="mb-3">
            <label htmlFor="calle" className="form-label">Calle</label>
            <input type="text" className="form-control perfil-input" id="calle" value={formData.calle} onChange={handleChange} required />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
              <input type="text" className="form-control perfil-input" id="departamento" value={formData.departamento} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label htmlFor="region" className="form-label">Región</label>
              <select className="form-select perfil-input" id="region" value={formData.region} onChange={handleChange}>
                <option>Región Metropolitana de Santiago</option>
                {/* (Agregar más regiones si es necesario) */}
              </select>
            </div>
          </div>
           <div className="mb-3">
              <label htmlFor="comuna" className="form-label">Comuna</label>
              <select className="form-select perfil-input" id="comuna" value={formData.comuna} onChange={handleChange}>
                <option>Cerrillos</option>
                <option>Maipú</option>
                <option>Pudahuel</option>
                {/* (Agregar más comunas si es necesario) */}
              </select>
            </div>
        </div>

        <div className="text-center bg-dark p-3 my-4 d-flex justify-content-between align-items-center rounded">
          <h3 className="mb-0">Total a pagar: ${totalGeneral.toLocaleString('es-CL')}</h3>
          <button type="submit" className="btn btn-success btn-lg" disabled={isProcessing}>
            {isProcessing ? 'Procesando pago...' : 'Pagar ahora'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;