import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/artists/${id}`)
      .then(response => setArtist(response.data))
      .catch(error => console.error('Error fetching artist details:', error));
  }, [id]);

  if (!artist) {
    return <p>Loading...</p>;
  }

  return (
    <div className="artist-details-container">
      <h2>{artist.name}</h2>
      <img src={artist.imageUrl} alt={artist.name} className="artist-details-image" />
      <h3>Songs:</h3>
      <ul>
        {artist.songs.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistDetails;
