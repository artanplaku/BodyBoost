import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
        username: username,
        password: password
    };

    axios.post('http://localhost:4000/api/users/login', loginData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/workouts');
        })
        .catch(err => {
            console.error(err);
        });
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login