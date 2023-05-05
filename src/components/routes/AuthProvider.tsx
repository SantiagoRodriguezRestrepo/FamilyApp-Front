import React, { useState } from 'react';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { decodeJWT } from '../../utils/auth';

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(() => {
    const userStorage = JSON.parse(localStorage.getItem('user') || '{}');
    const loggedUser = decodeJWT(userStorage)
    return userStorage ? loggedUser! : {
      id: '',
      nombre: '',
      apellido: '',
      rol: 0,
    };
  });

  const authContextValue: AuthContextType = {
    userAuthenticated,
    setUserAuthenticated,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
