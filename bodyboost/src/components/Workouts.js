import React, { useState } from 'react';
import axios from 'axios';

const Workouts = () => {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleAddExercise = () => {
    setExercises([...exercises, {
      name: '',
      sets: 0,
      reps: 0,
      weight: 0,
    }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workoutData = {
      title,
      exercises,
    };

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token is missing.');
        return;
      }
    
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
      const response = await axios.post('http://localhost:4000/api/workouts', workoutData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-User-Id': workoutData.userId,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Workout Title"
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
      <button type="submit">Create Workout</button>
    </form>
  );
};

export default Workouts;