import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss'
import { AuthContext } from '../contexts/AuthContext';
// import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faDumbbell,
  faHistory,
  faChartLine,
  faCog,
  faTrophy, 
  faMedal, 
  faSignInAlt, 
  faSignOutAlt, 
  faMountain,
  faHeartbeat,
 } 
from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);

  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };
  
  
  return (
    <nav className="navbar">
      {/* <LanguageSelector /> */}
    <ul>
      <li>
        <Link to="/home" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faHome} className='icon'/> 
          {t('navbar.home')}
          </Link>
        </li>
      <li>
        <Link to="/workouts" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faDumbbell} className='icon'/> 
          {t('navbar.workouts')}
          </Link>
      </li>
      <li>
        <Link to="/exercises" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faHeartbeat} className='icon'/>
          {t('navbar.exercises')}
          </Link>
          </li>
      <li>
        <Link to="/history" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faHistory} className='icon'/> 
          {t('navbar.history')}
          </Link>
          </li>
      <li>
        <Link to="/progress" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
            <FontAwesomeIcon icon={faChartLine} className='icon'/>
          {t('navbar.progress')}
          </Link>
          </li>
      <li>
        <Link to="/settings" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faCog} className='icon'/>
          {t('navbar.settings')}
          </Link>
          </li>
      <li>
        <Link to="/commitment" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faMedal} className='icon'/>
          {t('navbar.commitment')} 
          </Link>
          </li>
      <li>
        <Link to="/challenges" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
            <FontAwesomeIcon icon={faMountain} className='icon'/>
          {t('navbar.challenges')}
          </Link>
          </li>
      <li>
        <Link to="/achievements" 
          className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
          <FontAwesomeIcon icon={faTrophy} className='icon'/>
          {t('navbar.achievements')}
          </Link>
          </li>

      {isLoggedIn && 
       <li>
       <button 
        onClick={handleLogout} 
        className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>
        <FontAwesomeIcon icon={faSignOutAlt} className='icon'/>
        {t('navbar.logout')}
      </button>
      </li>}

      {!isLoggedIn &&
       <li>
        <Link to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className='icon'/>
          {t('navbar.login')}
          </Link>
          </li>}
    </ul>
  </nav>
  )
}

export default Navbar