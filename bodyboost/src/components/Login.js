import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Login.scss';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';

const Login = () => {
  const { t } = useTranslation();
const { setLoggedIn } = useContext(AuthContext);
const { isDarkMode } = useContext(ThemeContext);
const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState('');
const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
        username: username,
        password: password
    };

    axios.post('https://bodyboostbackend.onrender.com/api/users/login', loginData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setLoggedIn(true);
            navigate('/workouts');
        })
        .catch(err => {
          console.error(err);
          // Check if error response exists and has data
          if (err.response && err.response.data) {
              setLoginError(err.response.data);
          } else {
              setLoginError('An error occurred. Please try again.');
          }
        });
};

  return (
    <div className={`login-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <form className={`login-form ${isDarkMode ? 'dark-mode-form' : ''}`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('Login.username')}
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="password"
          placeholder={t('Login.password')}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit">{t('Login.submit')}</button>
        <div className='register-link'>
          {t('Login.account_question')} 
          <Link to='/register'>{t('Login.register')}</Link>
        </div>
      </form>
    </div>
  )
}

export default Login