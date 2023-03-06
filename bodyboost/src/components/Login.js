import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {

const { setLoggedIn } = useContext(AuthContext);
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
            setLoggedIn(true);
            navigate('/workouts');
        })
        .catch(err => {
            console.error(err);
        });
};

  return (
    <div>

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
      <div>Dont have an account? <Link to='/register'>Register here</Link></div>
   </div>
  )
}

export default Login