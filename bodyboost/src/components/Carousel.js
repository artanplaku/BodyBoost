import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icon2 from "../assets/images/bikes.png"
import icon1 from "../assets/images/image1.png"
import icon3 from "../assets/images/running.png"
import "../styles/Carousel.scss"

const Carousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: icon2,
      text: <>
      <div>Congrats</div>
      <span> on taking the first step!</span></>,
    },
    {
      src: icon3,
      text: <>
      <div>When it comes to fitness,</div>
      <span>finding what works for you makes all the difference.</span>
  </>
    },
    {
      src: icon1,
      text: 
      <>
      <div>You are unique,</div>
      <span> so is our program.</span></>,
    },
  ];

  useEffect(() => {
    const changeImage = () => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        navigate("/nameform");
      }
    };

    const timer = setTimeout(changeImage, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, navigate]);

  return (
    <div className="carousel">
      <img 
      src={images[currentIndex].src} 
      alt="Carousel" 
      className={currentIndex === 0 ? 'first-image' : 'carousel-image'}
      />
      <div className="carousel-text">
        {images[currentIndex].text}
      </div>
      <div className="carousel-pagination">
    {images.map((_, index) => (
        <span 
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
        ></span>
    ))}
      </div>


    </div>
  );
};

export default Carousel;

