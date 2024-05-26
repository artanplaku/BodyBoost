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
  const [weightEntries, setWeightEntries] = useState([]);
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

        if (profileData.weightHistory) {
          const formattedHistory = profileData.weightHistory.map(entry => ({
            ...entry,
            date: new Date(entry.date).toLocaleDateString()
          }));

          setWeightEntries(formattedHistory);
        } else {
          const initialEntry = {
            date: new Date(profileData.createdAt).toLocaleDateString(),
            weight: profileData.startingWeight
          };
          setWeightEntries([initialEntry]);
        }
      })
      .catch(err => {
        console.error('Error fetching user profile:', err);
      });
  }, [setUserData]);

const submitWeightUpdate = () => {
  if (!weightInput || !dateInput) {
    console.error('Weight and date input are required');
    return;
  }

  console.log('Submitting weight update:', { weightInput, dateInput });

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
    console.log('Weight update response:', response);
    setIsModalOpen(false);
    setUserData(prevData => ({ ...prevData, currentWeight: weightInput, lastUpdated: dateInput }));
    setWeightEntries(prevEntries => [...prevEntries, { date: dateInput, weight: parseFloat(weightInput) }]);
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
      <h2 className='weight-history-title'>Weight History</h2>
      <ul className='history-list'>
        {weightEntries.map((entry, index) => (
          <li key={index}>
           {entry.date}: {entry.weight} lbs
          </li>
        ))}
      </ul>
        </div>  
        <div className='history-container'>
          <History data={weightEntries}/>
        </div>
      </div>
    </div>
  );
  
}

export default Home;