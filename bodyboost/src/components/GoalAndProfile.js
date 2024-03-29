import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import "../styles/GoalAndProfile.scss";
import { UserContext } from '../contexts/UserContext';

const GoalAndProfile = () => {
  const { setUserData } = useContext(UserContext);

  const [gender, setGender] = useState('');   
//   const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('')
  const [goal, setGoal] = useState('')
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate()
  
  const tempValuesRef = useRef({
    age: "",
    currentWeight: "",
    weightGoal: ""
});

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit = () => {
    setUserData(prevData => ({
      ...prevData,
      startingWeight: weight,
      goalWeight: goal
  }));
    navigate("/register")
  }


  useEffect(() => {
    let newProgress = 0;
    
    if (gender) newProgress += 20;  
    if (feet && inches) newProgress += 20;
    if (age) newProgress += 20;
    if (weight) newProgress += 20;
    if (goal) newProgress += 20;

    setProgress(newProgress);
  }, [gender, feet, inches, age, weight, goal]);

  return (
    <div className="goal-and-profile">

      <h2>Goal and Profile</h2>

      <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>

      <div className="question">What is your gender?</div>
      <div className="gender-options">
        {['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'].map((option) => (
          <button 
            key={option} 
            className={`gender-option ${gender === option ? 'selected' : ''}`}
            onClick={() => handleGenderClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="question">What is your height?</div>
            <div className="height-inputs-group">
                <input 
                    type="number" 
                    placeholder="Feet" 
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    className="feet-input"
                />
                <input 
                    type="number" 
                    placeholder="Inches" 
                    value={inches}
                    min="0"
                    max="11"
                    onChange={(e) => setInches(e.target.value)}
                    className="inches-input"
                />
            </div>
      <div className="question">How old are you?</div>
      <input 
            type="number" 
            placeholder="Enter your age" 
            defaultValue={age}
            onChange={(e) => tempValuesRef.current.age = e.target.value}
            onBlur={() => setAge(tempValuesRef.current.age)}
            className="age-input"
        />
       <div className="question">What is your current weight?</div>
       <input 
            type="number" 
            placeholder="Enter your current weight" 
            defaultValue={weight}
            onChange={(e) => tempValuesRef.current.currentWeight = e.target.value}
            onBlur={() => setWeight(tempValuesRef.current.currentWeight)}
            className="weight-input"
        />
       <div className="question">What is your weight goal?</div>
       <input 
            type="number" 
            placeholder="Enter your weight goal" 
            value={goal}  
            onChange={(e) => setGoal(e.target.value)}  
            className="goal-input"
        />

        <button 
          className={`form-button fade-in-out ${goal.trim() ? 'visible' : ''}`} 
          onClick={handleSubmit}
        >
          Next
        </button>


    </div>
  );
};

export default GoalAndProfile;
