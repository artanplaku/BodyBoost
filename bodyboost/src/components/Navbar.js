import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss'
import { AuthContext } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';


const Navbar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };
  
  
  return (
    <nav className="navbar">
      <LanguageSelector />
    <ul>
      <li><Link to="/home">{t('navbar.home')}</Link></li>
      <li><Link to="/workouts">{t('navbar.workouts')}</Link></li>
      <li><Link to="/exercises">{t('navbar.exercises')}</Link></li>
      <li><Link to="/history">{t('navbar.history')}</Link></li>
      <li><Link to="/progress">{t('navbar.progress')}</Link></li>
      <li><Link to="/settings">{t('navbar.settings')}</Link></li>
      <li><Link to="/commitment">{t('navbar.commitment')} </Link></li>
      <li><Link to="/challenges">{t('navbar.challenges')}</Link></li>
      <li><Link to="/achievements">{t('navbar.achievements')}</Link></li>
      {isLoggedIn && <li><button onClick={handleLogout}>{t('navbar.logout')}</button></li>}
        {!isLoggedIn && <li><Link to="/login">{t('navbar.login')}</Link></li>}
    </ul>
  </nav>
  )
}

export default Navbar