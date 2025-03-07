import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { FaHeart, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/playlist`)
      .then((response) => {
        setPlaylist(response.data);
      })
      .catch((error) => {
        console.error('Error fetching playlist items: ', error);
      });
  }, []);

  const removeFromPlaylist = async (itemId) => {
    try {
      const selectedItem = playlist.find((item) => item.itemId === itemId);
      if (!selectedItem) {
        throw new Error('Selected item not found in playlist');
      }

      await axios.delete(`http://localhost:3000/playlist/${selectedItem.id}`);

      const response = await axios.get('http://localhost:3000/playlist');
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error removing item from playlist: ', error);
    }
  };

  const playAllSongs = () => {
    if (playlist.length === 0) return;

    let index = 0;
    const playNextSong = () => {
      if (index < playlist.length) {
        const nextSongAudio = document.getElementById(`audio-${playlist[index].id}`);
        if (nextSongAudio) {
          nextSongAudio.play();
          nextSongAudio.addEventListener('ended', () => {
            index++;
            playNextSong();
          });
        }
      } else {
        setIsPlaying(false);
      }
    };

    if (!isPlaying) {
      playNextSong();
      setIsPlaying(true);
    } else {
      const currentAudio = document.getElementById(`audio-${playlist[index].id}`);
      if (currentAudio) {
        currentAudio.pause();
      }
      setIsPlaying(false);
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
          Your Playlist
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
              <th>Play</th>
              <th>Remove</th>
              <th>
                <Button
                  style={{
                    backgroundColor: 'blue',
                    border: 'none',
                    width: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={playAllSongs}
                >
                  {isPlaying ? (
                    <FaPauseCircle style={{ width: '40px', height: '25px' }} />
                  ) : (
                    <FaPlayCircle style={{ width: '40px', height: '25px' }} />
                  )}
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((item, index) => (
              <tr key={item.id}>
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
                  <audio controls id={`audio-${item.id}`} style={{ width: '230px' }}>
                    <source src={item.songUrl} type="audio/mp3" />
                  </audio>
                </td>
                <td>
                  <Button
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeFromPlaylist(item.itemId)}
                  >
                    <FaHeart color="red" size={20} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Playlist;
