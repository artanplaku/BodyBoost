import React, { useState, useEffect, useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import '../styles/Workouts.scss'
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Day from './Day';

const Workouts = () => {
    const [title, setTitle] = useState('');
    const [exercises, setExercises] = useState([]);
    const [userId, setUserId] = useState('')
    const { workouts, setWorkouts, addWorkouts } = useContext(WorkoutContext);
    console.log(workouts)
    const [editingWorkoutData, setEditingWorkoutData] = useState({});
    const [editingWorkoutId, setEditingWorkoutId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [clickedExercises, setClickedExercises] = useState(new Set());
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();


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
            const initialClickedExercises = new Set();
            response.data.forEach(workout => {
              workout.exercises.forEach((exercise, index) => {
                if (exercise.clicked) {
                  initialClickedExercises.add(`${workout._id}-${index}`);
                }
              });
            });
            setClickedExercises(initialClickedExercises);
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
  //---------------------------------DELETE WORKOUT-----------------------------------------

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

  //---------------------------DELETE EXERCISE-----------------------------
  const handleDeleteExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
}

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
      const updatedWorkouts = workouts.map(workout => workout._id === id ? response.data : workout);
        setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error(error);
    }
  };
//-------------------------------------------------------------------------
const handleCircleClick = async (workoutId, exerciseIndex) => {
  const key = `${workoutId}-${exerciseIndex}`;
  const exercise = workouts.find(workout => workout._id === workoutId).exercises[exerciseIndex];

  // Optimistically update the UI
  const newClickedExercises = new Set(clickedExercises);
  if (clickedExercises.has(key)) {
    newClickedExercises.delete(key);
  } else {
    newClickedExercises.add(key);
  }
  setClickedExercises(newClickedExercises);

  try {
    // Call the backend to toggle the clicked status
    const response = await axios.put(`https://bodyboostbackend.onrender.com/api/workouts/${workoutId}/exercises/${exercise._id}/click`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    // Update state if needed
    const updatedWorkout = {...workouts.find(workout => workout._id === workoutId)};
    updatedWorkout.exercises[exerciseIndex] = {...updatedWorkout.exercises[exerciseIndex], ...response.data};
    setWorkouts(prevWorkouts => prevWorkouts.map(workout => workout._id === workoutId ? updatedWorkout : workout));

  } catch (error) {
    console.error(error);

    // If there's an error, revert the UI change
    const revertedClickedExercises = new Set(clickedExercises);
    if (revertedClickedExercises.has(key)) {
      revertedClickedExercises.delete(key);
    } else {
      revertedClickedExercises.add(key);
    }
    setClickedExercises(revertedClickedExercises);
    
    // Notify the user of the error
    alert('Failed to update the exercise status. Please try again.');
  }
};

const moveWorkout = (workoutId, fromDay, toDay) => {
  const workoutToMove = workouts.find(workout => workout._id === workoutId);
  workoutToMove.day = toDay;
  setWorkouts(prevWorkouts => {
      return prevWorkouts.filter(workout => workout._id !== workoutId).concat(workoutToMove);
  });
};


return (
    <DndProvider backend={HTML5Backend}>
        <div className='workout-container'>
            <div className="workouts-grid">
                {daysOfWeek.map(day => (
                  <Day 
                    key={day} 
                    day={day} 
                    workouts={workouts} 
                    moveWorkout={moveWorkout}
                    isDarkMode={isDarkMode}
                    setSelectedDay={setSelectedDay}
                    selectedDay={selectedDay}
                    handleSubmit={handleSubmit}
                    clickedExercises={clickedExercises}
                    handleCircleClick={handleCircleClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={title}
                    setTitle={setTitle}
                    exercises={exercises}
                    handleExerciseChange={handleExerciseChange}
                    isEditing={isEditing}
                    handleDeleteExercise={handleDeleteExercise}
                    handleAddExercise={handleAddExercise}
                />
                ))}
            </div>
        </div>
    </DndProvider>

);
};

export default Workouts;

