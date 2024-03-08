import React, { useState, useEffect } from 'react';
import { fetchSongsByGenre } from '../utils/spotifyApi';
import WebPlayback from './WebPlayback';

const Menu = () => {
    const [genre, setGenre] = useState('');
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const accessToken = localStorage.getItem('spotifyAccessToken');

    useEffect(() => {
      const fetchAndSetSongs = async () => {
        setLoading(true);
        setError(null);
        try {
          const fetchedSongs = await fetchSongsByGenre(genre, accessToken, 'US');
          const popularSongs = fetchedSongs.filter(song => song.popularity >= 10);
          console.log(popularSongs)
          setSongs(popularSongs);
          setCurrentSongIndex(0); // Reset to first song
          if (popularSongs.length > 0) {
            setCurrentTrackUri(popularSongs[0].uri);
          }
        } catch (err) {
          setError(err.message);
        }
        setLoading(false);
      };
    
      if (genre) {
        fetchAndSetSongs();
      }
    }, [genre, accessToken]);

    useEffect(() => {
        if (songs.length > 0 && currentSongIndex < songs.length) {
            setCurrentTrackUri(songs[currentSongIndex].uri);
        }
    }, [currentSongIndex, songs]);

    const handleGenreChange = (e) => {
      setGenre(e.target.value);
    };

    const handleSongClick = (uri) => {
      setCurrentTrackUri(uri);
    };

    const handleNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const handlePreviousSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    return (
      <div className='home-container'>
        <h1 className='button-header'>Choose a Genre</h1>
        <select className="neon-button" value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          <option value="Classic Rock">Classic Rock</option>
          <option value="Classic Rock">Classic Rock</option>
          <option value="Country">Country</option>
          <option value="Rap">Rap</option>
          <option value="Punk">Punk</option>
          <option value="Classical">Classical</option>
          <option value="Folk">Folk</option>
          <option value="Disco">Disco</option>
          <option value="Jazz">Jazz</option>
          <option value="Reggae">Reggae</option>
          <option value="EDM">EDM</option>
        </select>

        <button onClick={handlePreviousSong}>Previous</button>
        <button onClick={handleNextSong}>Next</button>

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
