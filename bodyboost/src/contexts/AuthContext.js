import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setLoggedIn: () => {},
  });
  

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          setLoggedIn(true);
      } else {
          setLoggedIn(false);
      }
  }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
