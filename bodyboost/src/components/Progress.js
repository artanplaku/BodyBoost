import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import "../styles/Progress.scss"
import { useTranslation } from 'react-i18next';

function Progress() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
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
    } catch (error) {
        console.error(error);
    }
};


  return (
    <div className="container">
    <input type="file" onChange={handleFileChange} />
    <button onClick={uploadFile}>{t('progress.upload')}</button>
    {images.map((imageData, index) => (
  <div key={imageData._id} className="image-wrapper">
    <img src={imageData.dataUrl} alt={`img-${index}`} className="image" />
    <button onClick={() => deleteImage(imageData._id)}>Delete</button>
  </div>
))}
  </div>
);
}

export default Progress;
