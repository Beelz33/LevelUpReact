import React from 'react';

function Comunidad() {
  return (
    <>
      {/* ¡OJO! He omitido el <nav> y el <footer> 
        porque esos irán en el componente principal 'App.js' 
        para que se muestren en todas las páginas.
      */}

      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{color: 'var(--color-azul-oscuro)'}}>Comunidad Level-Up</h1>
        
        <div className="row">
          <div className="col-md-8">
            <div className="card p-3 mb-4">
              <h3 style={{color: 'var(--color-azul-oscuro)'}}>Blog y Noticias</h3>
              
              {/* Esto después lo convertiremos en <Link> de react-router-dom */}
              <div className="mb-3">
                <h5 style={{color: 'var(--color-azul-medio)'}}>Los mejores juegos de 2025</h5>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Descubre los juegos más esperados de este año...</p>
                <button className="btn btn-sm btn-outline-primary">Leer más</button>
              </div>
              <div className="mb-3">
                <h5 style={{color: 'var(--color-azul-medio)'}}>Cómo mejorar tu setup gamer</h5>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Consejos para tener la mejor experiencia de juego...</p>
                <button className="btn btn-sm btn-outline-primary">Leer más</button>
              </div>

            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card p-3">
              <h3 style={{color: 'var(--color-azul-oscuro)'}}>Próximos Eventos</h3>
              <div className="mb-2">
                <strong style={{color: 'var(--color-azul-medio)'}}>Torneo de Valorant</strong>
                <p style={{color: 'var(--color-gris-oscuro)'}}>25 Nov - Santiago</p>
              </div>
              <div className="mb-2">
                <strong style={{color: 'var(--color-azul-medio)'}}>Expo Gaming</strong>
                <p style={{color: 'var(--color-gris-oscuro)'}}>3 Dic - Viña del Mar</p>
              </div>
              <div>
                <strong style={{color: 'var(--color-azul-medio)'}}>Competencia Fortnite</strong>
                <p style={{color: 'var(--color-gris-oscuro)'}}>10 Dic - Concepción</p>
              </div>
            </div>
            
            <div className="card p-3 mt-3">
              <h3 style={{color: 'var(--color-azul-oscuro)'}}>Síguenos en</h3>
              <div className="d-flex justify-content-around">
                <button className="btn btn-primary">Facebook</button>
                <button className="btn btn-info">Twitter</button>
                <button className="btn btn-danger">Instagram</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <h3 style={{color: 'var(--color-azul-medio)'}}>Nuestro Impacto en la Comunidad</h3>
            <div className="row text-center mt-4">
              <div className="col-md-4">
                <div className="display-4" style={{color: 'var(--color-azul-oscuro)'}}>15+</div>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Torneos apoyados</p>
              </div>
              <div className="col-md-4">
                <div className="display-4" style={{color: 'var(--color-azul-oscuro)'}}>200+</div>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Jóvenes beneficiados</p>
              </div>
              <div className="col-md-4">
                <div className="display-4" style={{color: 'var(--color-azul-oscuro)'}}>5%</div>
                <p style={{color: 'var(--color-gris-oscuro)'}}>Donación por compra</p>
              </div>
            </div>
            <div className="mt-4">
              <h5 style={{color: 'var(--color-azul-oscuro)'}}>¿Cómo tu compra ayuda a la comunidad?</h5>
              <ul style={{color: 'var(--color-gris-oscuro)'}}>
                <li>Parte de tu compra financia premios para competencias</li>
                <li>Organizamos workshops de gaming para principiantes</li>
                <li>Apoyamos a equipos nacionales con equipamiento</li>
                <li>Realizamos meetups y actividades para gamers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comunidad;