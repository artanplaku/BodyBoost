import { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    let initialMode;
    try {
        initialMode = JSON.parse(localStorage.getItem('isDarkMode'));
    } catch (error) {
        initialMode = false;
    }
    const [isDarkMode, setIsDarkMode] = useState(initialMode || false);
  
    const handleToggle = (mode) => {
        setIsDarkMode(mode)
        localStorage.setItem('isDarkMode', mode);
        if (mode) {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
        } else {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark-mode');
        }
      };
      useEffect(() => {
        handleToggle(isDarkMode);
    }, [isDarkMode]);
      

    return (
        <ThemeContext.Provider value={{ isDarkMode, handleToggle }}>
            {children}
        </ThemeContext.Provider>
    );
};