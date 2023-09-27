import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import "../styles/Progress.scss"
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronDown, faUpload, faFile } from '@fortawesome/free-solid-svg-icons';

function Progress() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      const response = await axios.get(`https://bodyboostbackend.onrender.com/api/images`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setImages(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await axios.post('https://bodyboostbackend.onrender.com/api/images/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = response.data;
      console.log(data);
      fetchImages(); // Fetch the images again after a new image is uploaded
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async (imageId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token is missing.');
        return;
    }

    try {
        await axios.delete(`https://bodyboostbackend.onrender.com/api/images/${imageId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        fetchImages();  // Refresh the images after deletion
        if (currentIndex >= images.length - 1) { 
          setCurrentIndex(images.length - 2);
      }
    } catch (error) {
        console.error(error);
    }
};

const nextImage = () => {
  if (currentIndex === images.length - 1) {
    setCurrentIndex(0);
  } else {
    setCurrentIndex(currentIndex + 1);
  }
};

const prevImage = () => {
  if (currentIndex === 0) {
    setCurrentIndex(images.length - 1);
  } else {
    setCurrentIndex(currentIndex - 1);
  }
};



return (
  <div className="progress-carousel-container">
    <div className="dropdown-container">

   <button className="dropdown-trigger" onClick={() => setShowDropdown(prev => !prev)}>
  Add a Picture <FontAwesomeIcon icon={faChevronDown} />
</button>
    {showDropdown && (
      <div className="dropdown-content">
        <div className="file-input-wrapper">
          <label htmlFor="fileInput" className="customFileInput">
            <FontAwesomeIcon icon={faFile} /> Choose a File
          </label>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
        <button onClick={uploadFile} disabled={!selectedFile}>
          <FontAwesomeIcon icon={faUpload} /> {t('progress.upload')}
        </button>
      </div>
    )}
    </div>

    {images[currentIndex] && (
      <div className="image-wrapper">
        <img src={images[currentIndex].dataUrl} alt={`img-${currentIndex}`} className="image" />
        <button className="delete-btn" onClick={() => deleteImage(images[currentIndex]._id)}>Delete</button>
      </div>
    )}
    
    <div className="carousel-indicators">
      {images.map((_, index) => (
        <span key={index} className={`indicator ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)}></span>
      ))}
    </div>

    <div className="carousel-navigation">
    <button onClick={prevImage}><FontAwesomeIcon icon={faChevronLeft} /> Prev</button>
    <button onClick={nextImage}>Next <FontAwesomeIcon icon={faChevronRight} /></button>
    </div>

  </div>
);

}

export default Progress;
