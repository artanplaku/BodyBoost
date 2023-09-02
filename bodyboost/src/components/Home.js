import React from 'react';
import { useTranslation } from 'react-i18next';
import History from './History';
import '../styles/Home.scss';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className='welcomeContainer'>
        <h1>{t('welcome_message')}</h1>
        <span className='neonText'>BodyBoost</span>
      </div>
      <p>{t('description_message')}</p>
      <History />
    </div>
  );
}

export default Home;
