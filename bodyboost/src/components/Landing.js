import React from 'react'
import "../styles/Landing.scss"


const Landing = () => {
  return (
    <div className="landing-page">
      <img src="image.jpg" alt="Top Left" className="top-left-image" />
      <img src="image.jpg" alt="Top Right" className="top-right-image" />
      <img src="image.jpg" alt="Below Top Right" className="below-top-right-image" />

      <div className="title-description">
        <h1 className="website-name">Bodyboost</h1>
        <p className="description">My description here...</p>
      </div>

      <div className="footer-section">
        <button className="start-button">Start</button>
        <p className="login-prompt">
          Already have an account? <button className="login-button">Login</button>
        </p>
      </div>
    </div>
  )
}

export default Landing;
