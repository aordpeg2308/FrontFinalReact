import React, { createContext, useState, useContext } from 'react';


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para gestionar si el usuario está autenticado o no

  // Función para iniciar sesión
  const login = (username) => {
    if (username === 'capibara') { // Si el usuario no es Capibara no inicia
      setIsLoggedIn(true);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
  };

  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
