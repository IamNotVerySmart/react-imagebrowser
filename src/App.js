import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  //useEffect(() => {
  //  if (searchTerm) {
  //    fetchFlickr(searchTerm);
  //  }
  //}, [searchTerm]);

  const fetchFlickr = (topic) => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1ef92020d8c1d68832adb7ada811d845&text=${topic}&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.photos) {
          setSearchResults(data.photos.photo);
        } else {
          console.error('Error XC:', data);
        }
      })
      .catch((error) => {
        console.error('Error XDD:', error);
      });
  };

  const handleSearch = (topic) => {
    setSearchTerm(topic);
    setSearchResults([]);
    setSelectedImage(null);
    fetchFlickr(topic);
  };

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>Flickr Image Search</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSearch('animals')}>Zwierzontko</button>
      <button onClick={() => handleSearch('landscapes')}>obrazkraju</button>
      <button onClick={() => handleSearch('city')}>Wieś</button>
      <button onClick={() => handleSearch('other')}>Ruszne</button>

      <div className="image-grid">
        {searchResults.map((photo) => (
          <div key={photo.id} className="image-item">
            <img
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
              alt={photo.title}
              onClick={() => handleImageClick(photo)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal">
          <div className="image-content">
            <img
              src={`https://live.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}_b.jpg`}
              alt={selectedImage.title}
            />
            <button onClick={handleCloseImage}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
