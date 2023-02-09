import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
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
    </ul>
  </nav>
  )
}

export default Navbar