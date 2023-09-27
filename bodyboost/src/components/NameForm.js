
import React, { useContext, useState } from 'react';
import "../styles/NameForm.scss"
import sunflower from "../assets/images/sunflower.png"
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom'

const NameForm = () => {
  const { setUserData } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFirstName(e.target.value); 
  };

  const handleSubmit = () => {
    setUserData(prevData => ({ ...prevData, firstName }));
    navigate('/goal')
  };
  return (
    <div className="name-form">
      <img src={sunflower} alt="sunflower" className="header-image"/>
      
      <div className="text-group">
        <div>Let's get to know each other.</div>
        <div>What is your name?</div>
      </div>

      <div className="input-container">
        <input 
        className="nameform-input"
        type="text" 
        id="firstname" 
        placeholder=" "
        value={firstName}
        onChange={handleInputChange}
        />
        <label htmlFor="firstname">First Name</label>
      </div>
      <button className='form-button' onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default NameForm;
