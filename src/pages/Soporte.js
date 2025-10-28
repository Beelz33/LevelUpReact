import React from 'react';

function Soporte() {
  
  // ¡NOTA! La lógica del formulario de contacto
  // la manejaremos después con 'useState'.

  return (
    <>
      {/* Omitimos <head>, <nav>, <footer> y <script> tags */}

      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{color: 'var(--color-azul-oscuro)'}}>Soporte Técnico</h1>
        
        <div className="row">
          {/* Formulario de Contacto */}
          <div className="col-md-6">
            <div className="card p-3 mb-4">
              <h3 style={{color: 'var(--color-azul-oscuro)'}}>Contáctanos</h3>
              
              {/* 1. Convertimos 'class' a 'className', 'style' a objeto JSX, y cerramos <input /> */}
              <div className="mb-3">
                <label className="form-label" style={{color: 'var(--color-azul-oscuro)'}}>Nombre</label>
                <input type="text" className="form-control bg-light" style={{color: 'var(--color-azul-oscuro)'}} />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: 'var(--color-azul-oscuro)'}}>Email</label>
                <input type="email" className="form-control bg-light" style={{color: 'var(--color-azul-oscuro)'}} />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{color: 'var(--color-azul-oscuro)'}}>Mensaje</label>
                {/* 2. Las <textarea> se cierran con </textarea> en JSX */}
                <textarea className="form-control bg-light" rows="4" style={{color: 'var(--color-azul-oscuro)'}}></textarea>
              </div>
              <button className="btn btn-outline-primary">Enviar mensaje</button>
              
              <div className="mt-3">
                <h5 style={{color: 'var(--color-azul-oscuro)'}}>O contáctanos por WhatsApp</h5>
                {/* 3. Las etiquetas <a> que van a sitios externos se quedan como <a> */}
                <a href="https://wa.me/56912345678" className="btn btn-outline-success">Chatear por WhatsApp</a>
              </div>
            </div>
          </div>
          
          {/* Preguntas Frecuentes */}
          <div className="col-md-6">
            <div className="card p-3">
              <h3 style={{color: 'var(--color-azul-oscuro)'}}>Preguntas Frecuentes</h3>
              <div className="mb-3">
                <h5 style={{color: 'var(--color-azul-medio)'}}>¿Cómo realizo una compra?</h5>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Selecciona el producto, agrega al carrito y completa tus datos.</p>
              </div>
              <div className="mb-3">
                <h5 style={{color: 'var(--color-azul-medio)'}}>¿Cuánto tarda el envío?</h5>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Entre 2-5 días hábiles dentro de Santiago.</p>
              </div>
              <div className="mb-3">
                <h5 style={{color: 'var(--color-azul-medio)'}}>¿Cómo uso mis puntos LevelUp?</h5>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Se aplican automáticamente al finalizar tu compra.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Soporte;