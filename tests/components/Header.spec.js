import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../src/context/CartContext';
// Importamos AMBOS, el Provider y el Contexto crudo
import { AuthProvider, AuthContext } from '../../src/context/AuthContext';
import Header from '../../src/components/Header';

describe('Componente Header', () => {

  // --- Prueba SIN usuario ---
  it('debería renderizarse correctamente sin usuario logueado', () => {
    render(
      <BrowserRouter>
        {/* Aquí usamos el AuthProvider completo, que internamente maneja currentUser como null */}
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    // Verificaciones (Asserts)
    expect(screen.getByText(/Inicio/i)).toBeTruthy();
    expect(screen.getByText(/Registro\/Login/i)).toBeTruthy();
    expect(screen.getByAltText('Logo')).toBeTruthy();
    // Verifica que el botón de logout NO esté
    expect(screen.queryByRole('button', { name: /Cerrar Sesión/i })).toBeNull();
  });

  // --- Prueba CON usuario ---
  it('debería renderizarse correctamente CON usuario logueado', () => {
    // 1. Simula un usuario y el valor del contexto
    const mockUser = { id: 1, email: 'test@test.com', nombre: 'UsuarioTest', role: 'customer' };
    const mockAuthContextValue = {
      currentUser: mockUser,
      logout: () => {}, // Mock de la función logout
      // No necesitamos simular login/register para esta prueba
    };

    // 2. Renderiza usando el AuthContext.Provider con el valor simulado
    render(
      <BrowserRouter>
        {/* Usamos el Contexto crudo para proveer el valor simulado */}
        <AuthContext.Provider value={mockAuthContextValue}>
          {/* CartProvider sigue siendo necesario */}
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // 3. Verificaciones (Asserts)
    // Verifica que se muestre el nombre del usuario
    expect(screen.getByText(new RegExp(mockUser.nombre, 'i'))).toBeTruthy();
    // Verifica que exista el botón de cerrar sesión
    expect(screen.getByRole('button', { name: /Cerrar Sesión/i })).toBeTruthy();
    // Verifica que NO exista el botón de login/registro
    expect(screen.queryByText(/Registro\/Login/i)).toBeNull();
  });

});