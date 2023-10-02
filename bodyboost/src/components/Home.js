import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import History from './History';
import Modal from './Modal';
import '../styles/Home.scss';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';


const Home = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { userData, setUserData } = useContext(UserContext);
  const [weightInput, setWeightInput] = useState('');  
  const [dateInput, setDateInput] = useState('');  

  console.log(userData)

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    axios.get('https://bodyboostbackend.onrender.com/api/userProfile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        const profileData = response.data;
        setUserData(profileData);
    })
    .catch(err => {
        console.error('Error fetching user profile:', err);
    });
}, []);

const submitWeightUpdate = () => {
  const token = localStorage.getItem('token');
  axios.put('https://bodyboostbackend.onrender.com/api/userProfile', {
      currentWeight: weightInput, 
      lastUpdated: dateInput
  }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
    setIsModalOpen(false);
    setUserData(prevData => ({ ...prevData, currentWeight: weightInput, lastUpdated: dateInput }));
  })
  .catch(error => {
      console.error('Error updating weight:', error);
  });
}

  
  return (
    <div className='home-container'>
      <div className='welcomeContainer'>
        <h1>{t('welcome_message')} {userData.firstName}</h1>
        {/* <span className={`${isDarkMode? "darkNeon":"neonText"}`}>BodyBoost</span> */}
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
        <div className="left-section">   
          <div className='weights-container'>
            <div className='weight-entry'>
              <div>{userData.startingWeight}lbs</div>
              <label>Start weight</label>
            </div>
            <div className='weight-entry'>
              <div>{userData.currentWeight}lbs</div>
              <label>Current weight</label>
            </div>
            <div className='weight-entry'>
              <div>{userData.goalWeight}lbs</div>
              <label>Goal weight</label>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)}>Add a weight entry</button>
          <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          weightInput={weightInput} 
          setWeightInput={setWeightInput}
          dateInput={dateInput}
          setDateInput={setDateInput}
          onSubmit={submitWeightUpdate} 
          />
        </div>  
        <div className='history-container'>
          <History />
        </div>
      </div>
    </div>
  );
  
}

export default Home;
//To do:
//Personalized greeting
//add tips or recommendations
//add modal for weights