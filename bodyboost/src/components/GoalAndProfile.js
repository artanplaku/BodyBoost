import React, { useState, useEffect, useRef } from 'react';
import "../styles/GoalAndProfile.scss";

const GoalAndProfile = () => {
  const [gender, setGender] = useState('');   
//   const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('')
  const [goal, setGoal] = useState('')
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [progress, setProgress] = useState(0);
  
  const tempValuesRef = useRef({
    age: "",
    currentWeight: "",
    weightGoal: ""
});

  const handleGenderClick = (selectedGender) => {
    setGender(selectedGender);
  };

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
            defaultValue={goal}
            onChange={(e) => tempValuesRef.current.weightGoal = e.target.value}
            onBlur={() => setGoal(tempValuesRef.current.weightGoal)}
            className="goal-input"
        />


    </div>
  );
};

export default GoalAndProfile;
