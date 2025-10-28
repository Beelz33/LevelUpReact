import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

// --- Creamos el Contexto (UNA SOLA VEZ y lo EXPORTAMOS) ---
export const AuthContext = createContext(); 

// --- Creamos el Provider (El "Cerebro") ---
export function AuthProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUserLevelUp');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("No se pudo leer el usuario del localStorage", error);
      setCurrentUser(null);
    }
    setLoading(false); 
  }, []);

  const login = async (email, password) => {
    const user = await loginUser(email, password);
    setCurrentUser(user); 
    localStorage.setItem('currentUserLevelUp', JSON.stringify(user)); 
    return user; 
  };

  const register = async (userData) => {
    const user = await registerUser(userData);
    setCurrentUser(user); 
    localStorage.setItem('currentUserLevelUp', JSON.stringify(user)); 
    return user; 
  };

  const logout = () => {
    setCurrentUser(null); 
    localStorage.removeItem('currentUserLevelUp'); 
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  // Usa el AuthContext exportado aquí
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// --- Creamos el Hook personalizado ---
export const useAuth = () => {
  // Usa el AuthContext exportado aquí también
  const context = useContext(AuthContext); 
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};