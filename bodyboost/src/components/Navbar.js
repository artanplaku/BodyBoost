import React, { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss'
import { AuthContext } from '../contexts/AuthContext';
// import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars,
 } from '@fortawesome/free-solid-svg-icons';
 import NavLinks from './NavLinks';



const Navbar = () => {
  const { t } = useTranslation();
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };
  
  
  return (
    <>
     <div className="hamburger" onClick={toggleModal}>
      <FontAwesomeIcon icon={faBars} />
    </div>

    <nav className="navbar">
    <NavLinks className="nav-links-common"
      isDarkMode={isDarkMode} 
      isLoggedIn={isLoggedIn} 
      handleLogout={handleLogout} 
      t={t} 
      />
    </nav>

    {isModalOpen && (
      <div className="modal-backdrop" onClick={toggleModal}>
      <div className="modal">
      <NavLinks
            className="nav-links-common" 
            isDarkMode={isDarkMode} 
            isLoggedIn={isLoggedIn} 
            handleLogout={handleLogout} 
            t={t} 
            />
         </div>
           </div>
           )}
  </>
  )
}

export default Navbar