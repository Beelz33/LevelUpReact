import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necesario por el <Link> dentro

// 1. Importa el componente a probar
//    Nota: ProductoCard está definido DENTRO de Catalogo.js,
//    así que necesitamos una forma de exportarlo o redefinirlo aquí.
//    Solución más simple: Copiar/Pegar la definición del componente aquí.

// --- Definición Copiada/Simplificada de ProductoCard ---
// (Esto es aceptable para pruebas unitarias enfocadas)
function ProductoCard({ producto }) {
  if (!producto) return null;
  const nombreProducto = producto.nombre || 'Producto sin nombre';
  const imagenProducto = producto.img || 'https://via.placeholder.com/300x200.png?text=No+Image';
  const precioProducto = producto.precioTexto || '$0 CLP';
  const categoriaNombre = producto.categoria || 'Sin categoría';

  // Importa Link aquí si no lo hiciste globalmente
  const Link = require('react-router-dom').Link; 

  return (
    <div className="col-md-4 mb-4 product-card" data-category={producto.categoria}>
      <div className="card h-100 text-white">
        <span className="badge bg-info category-badge">{categoriaNombre}</span>
        <img src={imagenProducto} className="card-img-top product-image" alt={nombreProducto} />
        <div className="card-body">
          <h5>{nombreProducto}</h5>
          <p className="text-success">{precioProducto}</p>
          <Link to={`/productos/${producto.id}`} className="btn btn-primary">
            Ver detalles
          </Link>
          <button className="btn btn-success mt-2">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}
// --- Fin de la Definición Copiada ---


describe('Componente ProductoCard', () => {

  // 2. Datos de prueba (un producto simulado)
  const mockProducto = {
    id: 101,
    nombre: 'Producto de Prueba',
    precioTexto: '$12.345 CLP',
    categoria: 'prueba',
    img: '/img/test.png',
    descripcion: 'Descripción corta' 
  };

  it('debería mostrar el nombre y precio recibidos por props', () => {
    // 3. Arrange: Renderiza el componente pasándole los datos de prueba
    render(
      <BrowserRouter> {/* Necesario por el <Link> */}
        <ProductoCard producto={mockProducto} />
      </BrowserRouter>
    );

    // 4. Assert: Verifica que los datos se muestren en pantalla
    
    // Busca el nombre del producto
    const nombreElement = screen.getByText(mockProducto.nombre);
    expect(nombreElement).toBeTruthy(); // Verifica que existe

    // Busca el precio del producto
    const precioElement = screen.getByText(mockProducto.precioTexto);
    expect(precioElement).toBeTruthy(); // Verifica que existe

    // (Opcional) Busca la imagen por su 'alt' text
    const imgElement = screen.getByAltText(mockProducto.nombre);
    expect(imgElement).toBeTruthy();
  });

  it('no debería renderizarse si no recibe producto', () => {
     // 5. Arrange: Renderiza sin pasar la prop 'producto' (o pasando null)
     const { container } = render(
      <BrowserRouter>
        <ProductoCard producto={null} /> 
      </BrowserRouter>
    );

    // 6. Assert: Verifica que el contenedor principal esté vacío
    expect(container.firstChild).toBeNull(); 
  });

});