// tests/context/CartContext.spec.js

// Importa el reducer y el estado inicial desde CartContext.js
// Asegúrate de que estén exportados en CartContext.js
import { cartReducer, initialState } from '../../src/context/CartContext'; 

describe('Reducer del Carrito (cartReducer)', () => {

  // Datos de prueba
  const mockProduct = { id: 1, nombre: 'Producto Test', precio: 1000 };
  const mockProduct2 = { id: 2, nombre: 'Otro Producto', precio: 500 };

  it('debería manejar la acción ADD_TO_CART para un carrito vacío', () => {
    // Arrange
    const action = { type: 'ADD_TO_CART', payload: mockProduct };
    
    // Act: Llama al reducer (el updateLocalStorage se ejecutará, pero lo ignoramos)
    const newState = cartReducer(initialState, action); 

    // Assert: Verifica el nuevo estado
    expect(newState).toEqual([{ ...mockProduct, qty: 1 }]); 
  });

  it('debería manejar la acción ADD_TO_CART para un producto existente', () => {
    // Arrange
    const initialExistingState = [{ ...mockProduct, qty: 1 }]; 
    const action = { type: 'ADD_TO_CART', payload: mockProduct };

    // Act
    const newState = cartReducer(initialExistingState, action);

    // Assert
    expect(newState).toEqual([{ ...mockProduct, qty: 2 }]); 
  });
  
  it('debería manejar la acción ADD_TO_CART para añadir un producto diferente', () => {
    // Arrange
     const initialExistingState = [{ ...mockProduct, qty: 1 }]; 
    const action = { type: 'ADD_TO_CART', payload: mockProduct2 };

    // Act
    const newState = cartReducer(initialExistingState, action);

    // Assert
     expect(newState).toEqual([
       { ...mockProduct, qty: 1 }, 
       { ...mockProduct2, qty: 1 }
     ]);
  });

  // (Aquí podríamos añadir más 'it' para probar REMOVE_FROM_CART, etc.)

});