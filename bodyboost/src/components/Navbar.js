import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss'
import { AuthContext } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';


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
      <LanguageSelector />
    <ul>
      <li>
        <Link to="/home" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.home')}</Link></li>
      <li>
        <Link to="/workouts" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.workouts')}</Link></li>
      <li>
        <Link to="/exercises" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.exercises')}</Link></li>
      <li>
        <Link to="/history" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.history')}</Link></li>
      <li>
        <Link to="/progress" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.progress')}</Link></li>
      <li>
        <Link to="/settings" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.settings')}</Link></li>
      <li>
        <Link to="/commitment" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.commitment')} </Link></li>
      <li>
        <Link to="/challenges" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.challenges')}</Link></li>
      <li>
        <Link to="/achievements" className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.achievements')}</Link></li>
      {isLoggedIn && <li><button onClick={handleLogout} className={`glow-button ${isDarkMode ? 'glow-button-dark' : ''}`}>{t('navbar.logout')}</button></li>}
        {!isLoggedIn && <li><Link to="/login">{t('navbar.login')}</Link></li>}
    </ul>
  </nav>
  )
}

export default Navbar