import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import History from './History';
import '../styles/Home.scss';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div>
      <div className='welcomeContainer'>
        <h1>{t('welcome_message')}</h1>
        <span className={`${isDarkMode? "darkNeon":"neonText"}`}>BodyBoost</span>
      </div>
      <p>{t('description_message')}</p>
      <History />
    </div>
  );
}

export default Home;
