import React from 'react'
import { useTranslation } from 'react-i18next';

const Achievements = () => {
  const { t } = useTranslation();
  return (
    <h1>{t('Achievements.achievements')}</h1>
  )
}

export default Achievements