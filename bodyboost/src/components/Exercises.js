import React, { useState, useEffect } from "react";
import '../styles/Exercises.css'
const Exercises = () => {
  
    // const [selectedDiv, setSelectedDiv] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <div className="container">
                        <h1>Difficulty</h1>
                    <div className="difficulty-container">
                        <div 
                        className="difficulty-div" 
                        onClick={() => handleDifficultyClick(0)} 
                        style={getDifficultyStyle(0)}
                        >
                        Beginner
                        </div>
                        <div 
                        className="difficulty-div"
                        onClick={() => handleDifficultyClick(1)} 
                        style={getDifficultyStyle(1)}
                        >
                        Intermediate
                        </div>
                        <div 
                        className="difficulty-div"
                        onClick={() => handleDifficultyClick(2)} 
                        style={getDifficultyStyle(2)}
                        >
                        Expert
                        </div>
                    </div>
                </div>
            </div>
        <div className="muscles-container">
                <h1>Muscles</h1>
                <div className="muscles-container-divs">
                {muscles.map((muscle, index) => (
                    <div
                    key={muscle}
                    className="muscle-div"
                    onClick={() => handleMuscleClick(index)}
                    style={getMuscleStyle(index)}
                    >
                    {muscle}
                    </div>
                ))}
                </div>
            </div>

            <ul>
                {exercises.map(exercise => (
                    <div key={exercise.name} className="exercise-card">
                    <h2>{exercise.name}</h2>
                    <p>Difficulty: {exercise.difficulty}</p>
                    <p>Muscle: {exercise.muscle}</p>
                    <p>Instructions: {exercise.instructions}</p>
                </div>
                
                )
                )}
            </ul>

                </div>
    );
  };

export default Exercises;





