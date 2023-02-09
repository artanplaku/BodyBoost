import './App.css';
import React  from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Workouts from './components/Workouts';
import Profile from './components/Profile';
import Exercises from './components/Exercises';
import History from './components/History';
import Progress from './components/Progress';
import Settings from './components/Settings';
import Challenges from './components/Challenges';
import Community from './components/Community';
import { Routes, Route,  } from 'react-router-dom'

function App() {
  return (
    <div className='container'>
      <Navbar />
      <div className='content'>

    <Routes>
      <Route path="/login" element={<Login  />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/history" element={<History />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/community" element={<Community />} />
    </Routes>
      </div>
  </div>
  );
}

export default App;
