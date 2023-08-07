import React, { useContext } from 'react';
import '../styles/Challenges.scss';
import { WorkoutContext } from '../contexts/WorkoutContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const Challenges = () => {
  const { t } = useTranslation();
  // Use the setWorkouts function from the WorkoutContext to update the state
  const { 
    workouts,
    setWorkouts, 
    addWorkouts 
  } = useContext(WorkoutContext);

  const handleClick = async () => {
    console.log("Challenge begun!");
  
    const pushups = {
      name: "Pushups",
      sets: 1,
      reps: "100",
      weight: "0",
    };
  
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    // Create a new workout for each day of the week
    const newWorkouts = daysOfWeek.map(day => {
      return {
        title: "Pushup Challenge",
        exercises: [pushups],
        day: day
      }
    })
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }
  
    let decodedToken;
  
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return;
    }
  
    if (!decodedToken || !decodedToken.id) {
      console.error('Invalid token:', decodedToken);
      return;
    }
  
    for (const workout of newWorkouts) {
      workout.userId = decodedToken.id; // Add userId field to each workout
  
      try {
        await axios.post('https://bodyboostbackend.onrender.com/api/workouts', workout, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-User-Id': workout.userId, // Add 'X-User-Id' to the headers
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  
    // Fetch the workouts from backend after adding the new workouts
    try {
      const response = await axios.get(`https://bodyboostbackend.onrender.com/api/workouts?userId=${decodedToken.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Append the new workouts to the existing ones
      const allWorkouts = [...response.data];
      newWorkouts.forEach(newWorkout => {
         if(!allWorkouts.find(workout => workout.title === newWorkout.title && workout.day === newWorkout.day)) {
      allWorkouts.push(newWorkout);
    }
  });

  setWorkouts(allWorkouts);
      
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <div className="challenge-container">
        <div className="challenge-card">
          <p className="challenge-text">{t('Challenges.challenge_text')}</p>
        </div>
        <button className="challenge-button" onClick={handleClick}>{t('Challenges.begin')}</button>
      </div>
    </div>
  );
}

export default Challenges;

