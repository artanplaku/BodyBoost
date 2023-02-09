import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Register = () => {

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

    axios.post('http://localhost:4000/register', registerData)
        .then(res => {
            console.log(res.data);
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
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
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

export default Register
