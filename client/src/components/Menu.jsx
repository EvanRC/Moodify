import React, { useState, useEffect } from 'react';
import { fetchSongsByGenre } from '../utils/spotifyApi';
import WebPlayback from './WebPlayback';

const Menu = () => {
    const [genre, setGenre] = useState('');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentTrackUri, setCurrentTrackUri] = useState(null);

    const accessToken = localStorage.getItem('spotifyAccessToken');
  
    useEffect(() => {
      if (genre) {
        setLoading(true);
        setError(null);
        fetchSongsByGenre(genre, accessToken)
          .then(fetchedSongs => {
            setSongs(fetchedSongs);
            setLoading(false);
            // Optionally set the first song as the current track to play
            if (fetchedSongs.length > 0) {
              setCurrentTrackUri(fetchedSongs[0].uri);
            }
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

    const handleSongClick = (uri) => {
      setCurrentTrackUri(uri);
    };

    return (
      <div className='home-container'>
        <h1 className='button-header'>Choose a Genre</h1>
        <select className="neon-button" value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          {/* ...other options... */}
        </select>

        {/* Render the WebPlayback component */}
        <WebPlayback accessToken={accessToken} trackUri={currentTrackUri} />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {songs.length > 0 && (
          <div>
            <h2>Songs:</h2>
            <ul>
              {songs.map(song => (
                <li key={song.id} onClick={() => handleSongClick(song.uri)}>
                  {song.name} by {song.artists[0].name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
};

export default Menu;
