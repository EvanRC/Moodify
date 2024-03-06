import React, { useState, useEffect } from 'react';
import { fetchSongsByGenre } from '../utils/spotifyApi';

const Menu = () => {
    const [genre, setGenre] = useState('');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const accessToken = localStorage.getItem('spotifyAccessToken');
  
    useEffect(() => {
      if (genre) {
        setLoading(true);
        setError(null);
        fetchSongsByGenre(genre, accessToken)
          .then(fetchedSongs => {
            setSongs(fetchedSongs);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [genre, accessToken]);
  
    const handleGenreChange = (e) => {
      setGenre(e.target.value);
    };
  
    return (
      <div>
        <h1>Choose a Genre</h1>
        <select value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="rap">Rap</option>
          <option value="country">Country</option>
          <option value="alternative">Alternative</option>
        </select>
  
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {songs.length > 0 && (
          <div>
            <h2>Songs:</h2>
            <ul>
              {songs.map(song => (
                <li key={song.id}>{song.name} by {song.artists[0].name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default Menu;
