import React, { useState, createContext, useEffect } from 'react';

export const WorkoutContext = createContext();

export const WorkoutProvider = props => {
    const [workouts, setWorkouts] = useState([]);

    const addWorkouts = (newWorkouts) => {
        console.log('Workouts before update:', workouts);
        setWorkouts(oldWorkouts => [...oldWorkouts, ...newWorkouts]);
      }

      useEffect(() => {
        console.log('Updated workouts:', workouts);
    }, [workouts]);

    return (
        <WorkoutContext.Provider value={{workouts, setWorkouts, addWorkouts}}>
            {props.children}
        </WorkoutContext.Provider>
    );
}