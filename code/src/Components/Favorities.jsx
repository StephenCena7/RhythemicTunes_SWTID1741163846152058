import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

function Favorities() {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/favorities`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.error('Error fetching playlist items: ', error);
      });
  }, []);

  const removeFromFavorites = async (itemId) => {
    try {
      const selectedItem = playlist.find((item) => item.itemId === itemId);
      if (!selectedItem) {
        throw new Error('Selected item not found in favorites');
      }

      await axios.delete(`http://localhost:3000/favorities/${selectedItem.id}`);

      const response = await axios.get('http://localhost:3000/favorities');
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error removing item from favorites: ', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e2f, #2a2a3d)',
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '85%',
          maxWidth: '1200px',
          background: '#23232e',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '26px',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Your Favorite Songs
        </h2>

        <Table
          responsive
          bordered
          hover
          variant="dark"
          style={{
            width: '100%',
            textAlign: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Remove</th>
              <th>Play</th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.imgUrl}
                    alt="Item Cover"
                    style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '5px',
                      marginRight: '15px',
                    }}
                  />
                  <div>
                    <strong>{item.title}</strong>
                    <p style={{ margin: '5px 0', fontSize: '14px', opacity: 0.7 }}>{item.singer}</p>
                  </div>
                </td>
                <td>{item.genre}</td>
                <td>
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFromFavorites(item.itemId)}
                  >
                    <FaHeart color="red" size={20} />
                  </Button>
                </td>
                <td>
                  <audio controls id={`audio-${item.id}`} style={{ width: '230px' }}>
                    <source src={item.songUrl} type="audio/mp3" />
                  </audio>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Favorities;
