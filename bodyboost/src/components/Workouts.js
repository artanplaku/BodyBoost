import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/Workouts.css'


const Workouts = () => {
    const [title, setTitle] = useState('');
    const [exercises, setExercises] = useState([]);
    const [userId, setUserId] = useState('')
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkoutData, setEditingWorkoutData] = useState({});
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    useEffect(() => {
        const fetchWorkouts = async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token is missing.');
            return;
          }
      
          try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            setUserId(userId);
      
            const response = await axios.get(`https://bodyboostbackend.onrender.com/api/workouts?userId=${userId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            setWorkouts(response.data);
            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        };
        fetchWorkouts();
      }, []);
      
//-------------------------------------------------------------------------
const handleAddExercise = () => {
    setExercises([
        ...exercises,
        {
          name: "",
          sets: [{ reps: 0, weight: 0 }],
          reps: "",
          weight: "",
        },
      ]);
  };
//-------------------------------------------------------------------------
  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };
//-------------------------------------------------------------------------
const handleEdit = (workout) => {
    setEditingWorkoutData(workout);
    setEditingWorkoutId(workout._id);
    setIsEditing(true);
    setTitle(workout.title);
    setExercises(workout.exercises);
    setSelectedDay(workout.day);
  };
 //------------------------------------------------------------------------- 
const handleSubmit = async (event) => {
    event.preventDefault();
  
    const workoutData = {
      title,
      exercises,
      day: selectedDay
    };

    console.log('Submitting workout data:', workoutData);
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }
  
    if (isEditing) {
      handleUpdate(editingWorkoutId, workoutData);
      setIsEditing(false);
    } else {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let parsedToken;
      console.log('base64:', base64);
      console.log('base64Url:', base64Url);
      console.log('token:', token);
  
      try {
        parsedToken = JSON.parse(window.atob(base64));
        console.log('parsedToken:', parsedToken);
      } catch (error) {
        console.error('Error parsing token:', error);
        return;
      }
      if (!parsedToken || !parsedToken.id) {
        console.error('Invalid token:', parsedToken);
        return;
      }
      workoutData.userId = parsedToken.id;
      console.log('workoutData:', workoutData);
  
      try {
        const response = await axios.post('https://bodyboostbackend.onrender.com/api/workouts', workoutData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-User-Id': workoutData.userId,
          },
        });
        console.log(response.data);
        setWorkouts([...workouts, response.data]);
      } catch (error) {
        console.error(error);
      }
    }
  
    setTitle('');
    setExercises([]);
    setSelectedDay(null);
  };
  //---------------------------------DELETE---------------------------------

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    try {
      await axios.delete(`https://bodyboostbackend.onrender.com/api/workouts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------UPDATE-------------------------------

  const handleUpdate = async (id, editedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    try {
      const response = await axios.put(`https://bodyboostbackend.onrender.com/api/workouts/${id}`, editedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWorkouts(workouts.map(workout => workout._id === id ? response.data : workout));
    } catch (error) {
      console.error(error);
    }
  };
//-------------------------------------------------------------------------

return (
  <div className='workout-container'>
      <div className="workouts-grid">
          {daysOfWeek.map(day => (
              <div className="day-row" key={day}>
                  <div className="day-row-header">
                      <h2>{day}</h2>
                      <div className="add-exercise-button" onClick={() => setSelectedDay(day)}>
                          <span>+</span>
                      </div>
                  </div>
                  {selectedDay === day && (
                      <form onSubmit={handleSubmit}>
                          <h2>Add a workout for {selectedDay}</h2>
                          <input
                              type="text"
                              placeholder="Muscle Target"
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                          />
                          {exercises.map((exercise, index) => (
                              <div key={index}>
                                  <input
                                      type="text"
                                      placeholder="Exercise Name"
                                      value={exercise.name}
                                      onChange={(event) => handleExerciseChange(index, 'name', event.target.value)}
                                  />
                                  <input
                                      type="number"
                                      placeholder="Sets"
                                      value={exercise.sets}
                                      onChange={(event) => handleExerciseChange(index, 'sets', event.target.value)}
                                  />
                                  <input
                                      type="number"
                                      placeholder="Reps"
                                      value={exercise.reps}
                                      onChange={(event) => handleExerciseChange(index, 'reps', event.target.value)}
                                  />
                                  <input
                                      type="number"
                                      placeholder="Weight"
                                      value={exercise.weight}
                                      onChange={(event) => handleExerciseChange(index, 'weight', event.target.value)}
                                  />
                              </div>
                          ))}
                          <button type="button" onClick={handleAddExercise}>Add Exercise</button>
                          <button type="submit">{isEditing ? "Update Workout" : "Create Workout"}</button>
                      </form>
                  )}
                  {workouts.filter(workout => workout.day === day).map((workout) => (
                      <div key={workout._id}>
                          <h3>{workout.title}</h3>
                          <ul>
                              {workout.exercises.map((exercise, index) => (
                                  <li key={index}>
                                      {exercise.name} - {exercise.sets} sets x {exercise.reps} reps x {exercise.weight} lbs
                                  </li>
                              ))}
                          </ul>
                          <button onClick={() => handleEdit(workout)}>Edit</button>
                          <button onClick={() => handleDelete(workout._id)}>Delete</button>
                      </div>
                  ))}
              </div>
          ))}
      </div>
  </div>
);
};

export default Workouts;