import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './artists.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/artists')
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artist data:', error));
  }, []);

  return (
    <div className="artist-container">
      <h2 className="artist-title">Featured Artists</h2>
      <div className="artist-grid">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-box">
            <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
            <h3 className="artist-name">{artist.name}</h3>
            <Link to={`/artist/${artist.id}`}>
              <button className="view-songs-btn">View Songs</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
