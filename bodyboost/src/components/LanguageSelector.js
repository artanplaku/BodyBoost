import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import 'flag-icon-css/css/flag-icons.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import "../styles/LanguageSelector.scss"
import { ThemeContext } from '../contexts/ThemeContext';


const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'us',
  },
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'de',
    name: 'Deutsch',
    country_code: 'de',
  },
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className='language-selector'>
      <button onClick={() => setOpen(!open)}>
      <FontAwesomeIcon icon={faGlobe} />
      </button>
      {open && (
        <ul className="language-list">
        {languages.map(({ code, name, country_code }) => (
          <li key={country_code} onClick={() => changeLanguage(code)} className={isDarkMode ? 'dark-mode' : ''}>
            <span className={`flag-icon flag-icon-${country_code}`}></span>
            {name}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

export default LanguageSelector;