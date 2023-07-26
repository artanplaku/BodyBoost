import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function Progress() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      {images.map((image) => (
        <img src={`https://bodyboostbackend.onrender.com${image.imageUrl}`} alt="" key={image._id} />

      ))}
    </div>
  );
}

export default Progress;
