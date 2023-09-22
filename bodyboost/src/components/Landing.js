import React from 'react'
import "../styles/Landing.scss"
import topLeftImage from "../assets/images/exercises1.png"
import cloud from "../assets/images/cloud.png"
import { useNavigate } from 'react-router-dom'


const Landing = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

  return (
    <div className="landing-page">
      <img src={cloud} alt="Top Left" className="top-left-image" />
      <img src={cloud} alt="Top Right" className="top-right-image" />
      <div className="title-description">
      <h1 className="website-name">Body<span>boost</span></h1>
        <p className="description">Where strength meets motivation</p>
      </div>
      <img src={cloud} alt="Below Top Right" className="below-top-right-image" />


      <div className="footer-section">
      <img src={topLeftImage} alt="Description " className="above-start-image" />
        <button className="start-button">Start</button>
        <p className="login-prompt">
          Already have an account? <button className="login-button" onClick={handleLogin}>Login</button>
        </p>
      </div>
    </div>
  )
}

export default Landing;
