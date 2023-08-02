import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.css'
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
const [username, setUserName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('')

const handleSubmit = (event) => {
    event.preventDefault();

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
        });
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
      <input
        type="email"
        placeholder={t('Register.email')}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder={t('Register.password')}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">{t('Register.submit')}</button>
      <div className='login-link'>
        {t('Register.account_question')} 
        <Link to='/login'>{t('Register.login')}</Link>
      </div>
    </form>
  </div>
  )
}

export default Register
