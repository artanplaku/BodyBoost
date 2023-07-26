import React, { useState } from 'react';

const Commitment = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    console.log('Slider value:', newValue); 
    setValue(newValue);
  };

  return (
    <div>
      <h1>Commitment Level</h1>
      <input
        type="range"
        min="1"
        max="4"
        value={value}
        onChange={handleChange}
        className="slider"
      />
      {value >= 1 && <p>Current Level: Lvl 1: Exercise Tracking</p>}
      {value >= 2 && <p>+ Level 2: Weight Tracking</p>}
      {value >= 3 && <p>+ Level 3: Photo Progress</p>}
      {value >= 4 && <p>+ Contract</p>}
    </div>
  );
}


export default Commitment