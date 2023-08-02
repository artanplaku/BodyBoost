import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Settings.css'
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const {isDarkMode, handleToggle} = useContext(ThemeContext);
  const { t } = useTranslation();

 

  return (
    <div>
    <h2>{t('Settings.title')}</h2>
      <div className="theme-toggle">
      <span>{isDarkMode ? t('Settings.dark') : t('Settings.light')} {t('Settings.mode')}:</span>
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