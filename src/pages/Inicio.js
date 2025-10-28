import React from 'react';
// 1. Importamos 'Link' de react-router-dom
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    // Usamos un fragmento <>...</> para agrupar todo
    <>
      {/* Sección del "Hero" (bienvenida) */}
      <div className="container text-center mt-5">
        <h1 className="logo display-4 mb-3">Level-up</h1>
        <p className="lead">Tu tienda de confianza para productos gaming en Chile</p>
        
        {/* 2. Convertimos el botón <a> en <Link> */}
        <Link to="/catalogo" className="btn btn-success btn-lg mt-3">Ver Productos</Link>
      </div>

      {/* Sección de Productos Destacados */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="productos-destacados-row">
          
          <div className="producto-tarjeta">
            <img src="https://clsonyb2c.vtexassets.com/arquivos/ids/463329-1600-auto?v=638436227763030000&width=1600&height=auto&aspect=true" alt="PlayStation 5" />
            <h5>PlayStation 5</h5>
            <p>$549.990 CLP</p>
            {/* 3. Convertimos este enlace <a> a <Link> */}
            {/* La ruta "/productos/5" la definiremos más adelante */}
            <Link to="/productos/5" className="btn">Ver detalles</Link>
          </div>
          
          <div className="producto-tarjeta">
            <img src="https://media.spdigital.cl/thumbnails/products/udp7nf1c_a20fef83_thumbnail_512.jpg" alt="Auriculares HyperX" />
            <h5>Auriculares HyperX</h5>
            <p>$79.990 CLP</p>
            <Link to="/productos/4" className="btn">Ver detalles</Link>
          </div>
          
          <div className="producto-tarjeta">
            <img src="/img/Silla secretLab titan.webp" alt="Silla SecretLab Titan" />
            <h5>Silla SecretLab Titan</h5>
            <p>$349.990 CLP</p>
            <Link to="/productos/7" className="btn">Ver detalles</Link>
          </div>

        </div>
      </div>

      {/* Sección de Recomendaciones */}
      <section className="py-5 bg-dark mt-5">
        <div className="container">
          <h2 className="text-center mb-5 recomendaciones-title">Recomendaciones para ti</h2>
          <div className="row">
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-white">
                <img src="/img/Catan.png" className="card-img-top" alt="Recomendación" />
                <div className="card-body">
                  <h5 className="card-title">Para ti que te gustan los juegos de estrategia</h5>
                  <p className="card-text">Descubre juegos similares a los que ya disfrutas.</p>
                  <Link to="/productos/1" className="btn btn-outline-recomendacion">Ver recomendaciones</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-white">
                <img src="/img/Mousepad goliathus extended .png" className="card-img-top" alt="Recomendación" />
                <div className="card-body">
                  <h5 className="card-title">Completa tu setup gamer</h5>
                  <p className="card-text">Productos que complementan tus compras anteriores.</p>
                  <Link to="/productos/9" className="btn btn-outline-recomendacion">Ver accesorios</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-4">
              <div className="card h-100 text-white">
                <img src="https://xboxwire.thesourcemediaassets.com/sites/4/Deadpool-Double_Controller-DP_16x9-FINAL-91c067ffa6e5f5a587c4-1536x864-1-656d3fd505fc5c52b10e.jpg" className="card-img-top" alt="Recomendación" />
                <div className="card-body">
                  <h5 className="card-title">Ofertas exclusivas</h5>
                  <p className="card-text">Descuentos especiales basados en tus preferencias.</p>
                  <Link to="/productos/3" className="btn btn-outline-recomendacion">Ver ofertas</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;