import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import History from './History';
import '../styles/Home.scss';
import { ThemeContext } from '../contexts/ThemeContext';

const Home = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const startWeight = "75kg";
  const currentWeight = "70kg"; 
  const goalWeight = "60kg"; 
  
  return (
    <div className='home-container'>
      <div className='welcomeContainer'>
        <h1>{t('welcome_message')}</h1>
        <span className={`${isDarkMode? "darkNeon":"neonText"}`}>BodyBoost</span>
      </div>
      <div className='description-container'>
      <p>{t('description_message')}</p>
      </div>
      <div className="divider-container">
      <span className="label label-left">Weight</span>
      <hr className="horizontal-line"/>
      <span className="label label-right">Exercises</span>
    </div>
    <div className='bottom-section'>

      <div className='weights-container'>
        <div className='weight-entry'>
          <div>{startWeight}</div>
          <label>Start weight</label>
        </div>
        <div className='weight-entry'>
          <div>{currentWeight}</div>
          <label>Current weight</label>
        </div>
        <div className='weight-entry'>
          <div>{goalWeight}</div>
          <label>Goal weight</label>
        </div>
        <button>Add a weight entry</button>
      </div>
      <div className='history-container'>
      <History />
      </div>
    </div>
    </div>
  );
}

export default Home;
