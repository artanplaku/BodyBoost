import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setLoggedIn: () => {},
  });
  

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          setLoggedIn(true);
        }
      }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
