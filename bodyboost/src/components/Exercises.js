import React, { useState, useEffect, useContext } from "react";
import '../styles/Exercises.scss'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';

const Exercises = () => {
  
    // const [selectedDiv, setSelectedDiv] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDay, setSelectedDay] = useState({});
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();
    


    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

   
    const handleDaySelect = (exerciseName, day) => {
      setSelectedDay({
          ...selectedDay,
          [exerciseName]: day
      });
  };
    
    console.log(selectedDay)
    const difficulties = ["beginner", "intermediate", "expert"];

    const muscles = [
      "abdominals",
      "abductors",
      "biceps",
      "calves",
      "chest",
      "forearms",
      "glutes",
      "hamstrings",
      "lats",
      "lower_back",
      "middle_back",
      "neck",
      "quadriceps",
      "traps",
      "triceps"
    ];

    const handleDifficultyClick = index => {
      setSelectedDifficulty(selectedDifficulty === index ? null : index);
    };

    const handleMuscleClick = index => {
      setSelectedMuscle(selectedMuscle === index ? null : index);
      console.log(selectedMuscle)
    };
  
    const getDifficultyStyle = index => {
      return selectedDifficulty === index ? { backgroundColor: "lightgreen" } : {};
    };
  
    const getMuscleStyle = index => {
      return selectedMuscle === index ? { backgroundColor: "lightgreen" } : {};
    };
    
  
    useEffect(() => {
        setLoading(true);
        let url = "https://api.api-ninjas.com/v1/exercises?";
        if (selectedDifficulty !== null) {
            url += `difficulty=${difficulties[selectedDifficulty]}&`;
          }
          if (selectedMuscle !== null) {
            url += `muscle=${muscles[selectedMuscle]}&`;
          }
          
        fetch(url, {
          method: "GET",
          headers: { "X-Api-Key": "pwZ06FOs/ltkgvPROwtC3w==VQYX0Z0OPV6gaSun", "Content-Type": "application/json" }
        })
        .then(res => {
            console.log("Response:", res);
            return res.json();
          })
          .then(result => {
            console.log(result);
            setExercises(result);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }, [selectedDifficulty, selectedMuscle]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>An error occurred: {error.message}</div>;
    }
  
    return (
      <div>
          <div>
              <div className="exercises-container">
                      <h1>{t('exercises.difficulty')}</h1>
                  <div className="difficulty-container">
                      <div 
                      className={`difficulty-div ${isDarkMode ? 'difficulty-div-dark' : ''}`} 
                      onClick={() => handleDifficultyClick(0)} 
                      style={getDifficultyStyle(0)}
                      >
                      {t('exercises.beginner')}
                      </div>
                      <div 
                      className={`difficulty-div ${isDarkMode ? 'difficulty-div-dark' : ''}`} 
                      onClick={() => handleDifficultyClick(1)} 
                      style={getDifficultyStyle(1)}
                      >
                      {t('exercises.intermediate')}
                      </div>
                      <div 
                      className={`difficulty-div ${isDarkMode ? 'difficulty-div-dark' : ''}`} 
                      onClick={() => handleDifficultyClick(2)} 
                      style={getDifficultyStyle(2)}
                      >
                      {t('exercises.expert')}
                      </div>
                  </div>
              </div>
          </div>
      <div className="muscles-container">
              <h1>{t('exercises.muscles')}</h1>
              <div className="muscles-container-divs">
              {muscles.map((muscle, index) => (
                  <div
                  key={muscle}
                  className={`muscle-div ${isDarkMode ? 'muscle-div-dark' : ''}`}
                  onClick={() => handleMuscleClick(index)}
                  style={getMuscleStyle(index)}
                  >
                  {t(`exercises.muscle_${muscle}`)}
                  </div>
              ))}
              </div>
          </div>

          <ul>
              {exercises.map((exercise) => (
                  <div key={exercise.name} className={`exercise-card ${isDarkMode ? 'exercise-card-dark' : ''}`}>
                  <div className="title-container">
                    <h2>{exercise.name}</h2>
                    <div
                          className="add-circle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDay({ 
                              ...selectedDay, 
                              [exercise.name]: selectedDay && selectedDay[exercise.name] ? null : daysOfWeek[0] 
                            });
                          }}
                        >
                  +
                  <span className="tooltip-text">{t('exercises.add_to_workouts')}</span>
                      {selectedDay && selectedDay[exercise.name] && (
                        <div>
                          <select
                          value={selectedDay[exercise.name]}
                          onChange={(e) => {
                            e.stopPropagation(); 
                            handleDaySelect(exercise.name, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="">{t('exercises.select_a_day')}</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {t(`exercises.day_${day.toLowerCase()}`)}
                            </option>
                          ))}
                        </select>
                    </div>
                  )}
                    </div>
                  </div>
                  <p>{t('exercises.difficulty')}: {exercise.difficulty}</p>
                  <p>{t('exercises.muscle')}: {exercise.muscle}</p>
                  <p>{t('exercises.instructions')}: {exercise.instructions}</p>
                </div>
              
              )
              )}
          </ul>

              </div>
  );
  };

export default Exercises;





