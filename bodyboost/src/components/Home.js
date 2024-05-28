import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import History from './History';
import Modal from './Modal';
import '../styles/Home.scss';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        const formattedHistory = profileData.weightHistory.map(entry => {
          const normalizedDate = new Date(entry.date);
          const utcDate = new Date(Date.UTC(normalizedDate.getUTCFullYear(), normalizedDate.getUTCMonth(), normalizedDate.getUTCDate()));
          console.log('Date in fetched weight history:', utcDate.toISOString().split('T')[0]);
          return {
            ...entry,
            date: utcDate.toISOString().split('T')[0]
          };
        });
  
        formattedHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        setWeightEntries(formattedHistory);
      } else {
        const initialEntry = {
          date: new Date(profileData.createdAt).toISOString().split('T')[0],
          weight: profileData.startingWeight,
          _id: profileData._id
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
  
    console.log('Date selected in modal:', dateInput);
  
    const token = localStorage.getItem('token');
  
    const inputDate = new Date(dateInput);
    const utcDate = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate()));
  
    console.log('Date being sent in PUT request:', utcDate.toISOString());
  
    axios.put('https://bodyboostbackend.onrender.com/api/userProfile', {
        currentWeight: weightInput, 
        lastUpdated: utcDate.toISOString()
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      console.log('Response from PUT request:', response.data);
  
      setIsModalOpen(false);
  
      const formattedDate = utcDate.toISOString().split('T')[0];
  
      const newEntry = response.data.weightHistory.find(entry => 
        new Date(entry.date).toISOString().split('T')[0] === formattedDate && 
        entry.weight === parseFloat(weightInput)
      );
  
      if (!newEntry) {
        console.error('New entry not found in the updated weightHistory');
        return;
      }
  
      const updatedEntries = [...weightEntries, { date: formattedDate, weight: parseFloat(weightInput), _id: newEntry._id }];
  
      updatedEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
  
      setUserData(prevData => ({ ...prevData, currentWeight: weightInput, lastUpdated: formattedDate }));
      setWeightEntries(updatedEntries);
    })
    .catch(error => {
        console.error('Error updating weight:', error);
    });
  }
  
  
  
  

const deleteWeightEntry = (entryId) => {
  const token = localStorage.getItem('token');

  axios.delete(`https://bodyboostbackend.onrender.com/api/userProfile/weightHistory/${entryId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Weight entry deleted:', response);
    setWeightEntries(prevEntries => prevEntries.filter(entry => entry._id !== entryId));
  })
  .catch(error => {
    console.error('Error deleting weight entry:', error);
  });
};

  
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
            <li key={entry._id}>
            <div>{entry.date}: {entry.weight} lbs </div>
            <FontAwesomeIcon 
              icon={faTrash} 
              className='delete-icon' 
              onClick={() => deleteWeightEntry(entry._id)} 
            />
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