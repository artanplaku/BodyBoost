import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.scss'
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      formErrors["username"] = "*Please enter your username.";
    }

    if (!email) {
      formIsValid = false;
      formErrors["email"] = "*Please enter your email.";
    }

    if (typeof email !== "undefined") {
      // Regular expression for email validation
      var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!pattern.test(email)) {
        formIsValid = false;
        formErrors["email"] = "*Please enter valid email.";
      }
    }

    if (!password) {
      formIsValid = false;
      formErrors["password"] = "*Please enter your password.";
    }
    
    if (password.length < 8) {
      formIsValid = false;
      formErrors["password"] = "*Password should be at least 8 characters.";
    }

    setErrors(formErrors);
    return formIsValid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      const registerData = {
        username: username,
        email: email,
        password: password
      };
  
      axios.post('https://bodyboostbackend.onrender.com/api/users/register', registerData)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
          if (err.response) {
            let serverError = {};
            if (err.response.data.includes('E11000 duplicate key error')) {
              if (err.response.data.includes('username')) {
                serverError["username"] = 'This username is already in use.';
              } else if (err.response.data.includes('email')) {
                serverError["email"] = 'This email address is already in use.';
              }
            } else {
              serverError["server"] = err.response.data;
            }
            setErrors(prevErrors => ({
              ...prevErrors,
              ...serverError
            }));
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log('Error', err.message);
          }
          console.log(err.config);
        });
    }
  };
  

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('Register.username')}
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
        <input
          type="email"
          placeholder={t('Register.email')}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.server && <div className="error-message">{errors.server}</div>}
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input
          type="password"
          placeholder={t('Register.password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
       {errors.password && <div className="error-message">{errors.password}</div>}
        <button type="submit">{t('Register.submit')}</button>
        <div className='login-link'>
          {t('Register.account_question')} 
          <Link to='/login'>{t('Register.login')}</Link>
        </div>
      </form>
    </div>
  )
}

export default Register;

