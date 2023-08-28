import React from 'react';
import { Link } from 'react-router-dom';
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

const NavLinks = ({ className, isDarkMode, isLoggedIn, handleLogout, t }) => {
  return (
    <div className={className}>
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
    </div>
  )
}

export default NavLinks