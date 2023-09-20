import './App.scss';
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
import Landing from './components/Landing';

import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';

// const { isLoggedIn, isLoading } = useContext(AuthContext);

function ProtectedRoute() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
      return <div>Loading...</div>;
  }
  
  if (isLoggedIn) {
      return <Home />;
  }
  
  return <Navigate to="/login" replace />;
}



function App() {
  const { isDarkMode } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

 

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      {isLoggedIn && <Navbar />}
      <div className='content'>

    <Routes>
      {/* <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} /> */}
      <Route path="/" element={<ProtectedRoute />} />
      <Route path="/landing" element={<Landing  />} />
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
    </Routes>
      </div>
  </div>
  );
}

export default App;
