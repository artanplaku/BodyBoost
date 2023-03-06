import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import '../styles/Navbar.css'
import { AuthContext } from '../contexts/AuthContext';


const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };
  
  
  return (
    <nav className="navbar">
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/workouts">Workouts</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/exercises">Exercises</Link></li>
      <li><Link to="/history">History</Link></li>
      <li><Link to="/progress">Progress</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/challenges">Challenges</Link></li>
      <li><Link to="/community">Community</Link></li>
      {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
    </ul>
  </nav>
  )
}

export default Navbar