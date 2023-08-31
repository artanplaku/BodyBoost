import React from 'react'
import { useTranslation } from 'react-i18next';
import History from './History';


const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
      <h1>{t('welcome_message')}</h1>
      <p>{t('description_message')}</p>
      <History />
    </div>

    </div>
  )
}

export default Home