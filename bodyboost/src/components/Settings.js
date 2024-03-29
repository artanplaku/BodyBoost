import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/Settings.scss'
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';


const Settings = () => {
  const {isDarkMode, handleToggle} = useContext(ThemeContext);
  const { t } = useTranslation();

 

  return (
    <div className={`settings-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    <h2>{t('Settings.title')}</h2>

      <div className="theme-toggle">
      <span>{isDarkMode ? t('Settings.dark') : t('Settings.light')} {t('Settings.mode')}:</span>
        <input 
          type="checkbox" 
          className="l" 
          checked={isDarkMode} 
          onChange={(e) => handleToggle(e.target.checked)}
        />
      </div>

      <div className='language-selection'>
      <span>Languages:</span>
      <LanguageSelector />
      </div>
  </div>
);
};


export default Settings;