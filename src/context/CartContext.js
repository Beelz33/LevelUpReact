import React, { createContext, useContext, useReducer } from 'react'; // Eliminado useEffect no usado aquí

// --- Lógica del Reducer ---

// Esta función se asegura de que el estado se guarde en localStorage
// La exportamos para poder simularla (mock) en las pruebas unitarias del reducer
export function updateLocalStorage(state) {
  try {
      localStorage.setItem('carritoLevelUp', JSON.stringify(state));
  } catch (e) {
      console.error("Error guardando carrito en localStorage", e);
  }
  return state;
}

// 👇 EXPORTA el estado inicial para usarlo en las pruebas 👇
export const initialState = [];

// Función para obtener el estado inicial desde localStorage
const getInitialState = () => {
  try {
    const storedCart = localStorage.getItem('carritoLevelUp');
    // Verifica si storedCart no es null ni undefined antes de parsear
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error("No se pudo leer el carrito del localStorage", error);
    // Limpia localStorage si está corrupto
    localStorage.removeItem('carritoLevelUp');
    return initialState;
  }
};

// 👇 EXPORTA el reducer para probarlo directamente 👇
export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      // Validación básica del producto
      if (!product || typeof product.id === 'undefined') {
          console.error("Intento de añadir producto inválido:", product);
          return state; // No modifica el estado si el producto es inválido
      }
      const existingItem = state.find(item => item.id === product.id);

      let newState;
      if (existingItem) {
        newState = state.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        newState = [...state, { ...product, qty: 1 }];
      }
      // Llama a updateLocalStorage ANTES de retornar el nuevo estado
      return updateLocalStorage(newState);
    }

    case 'REMOVE_FROM_CART': {
      const productId = action.payload;
      const newState = state.filter(item => item.id !== productId);
      return updateLocalStorage(newState);
    }

    case 'UPDATE_QUANTITY': {
      const { productId, amount } = action.payload;
      let newState = state.map(item =>
        item.id === productId ? { ...item, qty: Math.max(0, item.qty + amount) } : item // Evita negativos
      );
      // Filtra items con cantidad 0 o menos DESPUÉS de actualizar
      newState = newState.filter(item => item.qty >= 1);
      return updateLocalStorage(newState);
    }

    case 'CLEAR_CART': {
      return updateLocalStorage(initialState);
    }

    default:
      // Si la acción no es reconocida, devuelve el estado sin cambios
      return state;
  }
};

// --- Contexto y Provider ---
// Crea el contexto (no necesita exportarse si usamos el hook useCart)
const CartContext = createContext();

export function CartProvider({ children }) {
  // Usa getInitialState como función inicializadora para que se llame solo una vez
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  // Funciones memoizadas con useCallback (opcional, buena práctica para evitar re-renders innecesarios)
  const addToCart = React.useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, []);

  const removeFromCart = React.useCallback((productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const updateQuantity = React.useCallback((productId, amount) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, amount } });
  }, []);

  const clearCart = React.useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Memoiza el valor del contexto para optimizar
  const value = React.useMemo(() => ({
    cartItems: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }), [state, addToCart, removeFromCart, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// --- Hook personalizado ---
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};