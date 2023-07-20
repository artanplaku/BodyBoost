import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Settings.css'

const Settings = () => {
  const {isDarkMode, handleToggle} = useContext(ThemeContext);

 

  return (
    <div>
    <h2>Settings</h2>
      <div className="theme-toggle">
        <span>{isDarkMode ? 'Dark' : 'Light'} Mode:</span>
        <input 
          type="checkbox" 
          className="l" 
          checked={isDarkMode} 
          onChange={handleToggle}
        />
      </div>
  </div>
);
};


export default Settings;