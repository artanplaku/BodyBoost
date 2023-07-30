import './App.css';
import React  from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Workouts from './components/Workouts';
import Commitment from './components/Commitment';
import Exercises from './components/Exercises';
import History from './components/History';
import Progress from './components/Progress';
import Settings from './components/Settings';
import Challenges from './components/Challenges';
import Achievements from './components/Achievements';
import Contract from './components/Contract';
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
      <Route path="/commitment" element={<Commitment />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/history" element={<History />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/contract" element={<Contract />}/>
    </Routes>
      </div>
  </div>
  );
}

export default App;
