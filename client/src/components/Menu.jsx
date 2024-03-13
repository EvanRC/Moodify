import React, { useState, useEffect } from 'react';
import { generateMusicSuggestion } from '../utils/openAiApi'; // Import the function to generate music suggestions
import { fetchSongsBySearchTerm } from '../utils/spotifyApi';
import WebPlayback from './WebPlayback';

const Menu = () => {
  const [genre, setGenre] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTrackUri, setCurrentTrackUri] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [mood, setMood] = useState(''); // State to hold the mood input

  const accessToken = localStorage.getItem('spotifyAccessToken');

  const extractSearchTerms = (suggestion) => {
    // This is a very basic implementation and might need to be adjusted
    // based on the actual format and content of the suggestions you receive from OpenAI.

    // Example: Extract artist names or genres assuming they are always mentioned after "artists like" or "genres like"
    const artistOrGenreRegex = /artists like ([\w\s]+) or genres like ([\w\s]+)/;
    const matches = suggestion.match(artistOrGenreRegex);

    if (matches) {
      // Assuming the first capture group is artists and the second is genres
      const artists = matches[1].split(',').map(artist => artist.trim());
      const genres = matches[2].split(',').map(genre => genre.trim());

      // Just an example of combining and filtering out empty strings
      const searchTerms = [...artists, ...genres].filter(term => term);

      return searchTerms.join(" "); // Combine terms into a single search query
    }

    // If the format does not match, return the original suggestion or handle differently
    return suggestion;
  };

  useEffect(() => {
    if (!genre) return; // Skip if no genre is selected

    const fetchSongsByGenre = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call with 'genre' as the searchType
        const fetchedSongs = await fetchSongsBySearchTerm(genre, accessToken, 'US', 'genre');

        // Calculate the average popularity of fetched songs
        const averagePopularity = fetchedSongs.reduce((acc, song) => acc + song.popularity, 0) / fetchedSongs.length;

        // Include songs that have a popularity score above half the average
        // Adjust the division factor as needed to control restrictiveness
        const popularSongs = fetchedSongs.filter(song => song.popularity >= (averagePopularity / 2));

        setSongs(popularSongs);
        setCurrentSongIndex(0);
        if (popularSongs.length > 0) {
          setCurrentTrackUri(popularSongs[0].uri);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongsByGenre();
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
  const handleMoodChange = async (event) => {
    setMood(event.target.value);
  };
  // Function to handl mood submission and fetching songs by mood
  const handleMoodSubmit = async () => {
    if (!mood) return; // Skip if no mood is entered

    setLoading(true);
    setError(null);
    try {
      // Get music suggestion from OpenAI based on mood
      const suggestion = await generateMusicSuggestion(mood);
      // Extract relevant search terms from the suggestion if needed
      const searchTerm = extractSearchTerms(suggestion); // Implement this function based on your needs

      // Call with 'mood' or another relevant value as the searchType
      const fetchedSongs = await fetchSongsBySearchTerm(searchTerm, accessToken, 'US', 'mood');
      setSongs(fetchedSongs);
      setCurrentSongIndex(0);
      if (fetchedSongs.length > 0) {
        setCurrentTrackUri(fetchedSongs[0].uri);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home-container'>
      <h1 className='button-header'>Choose a Genre or Enter a Mood</h1>
      <input
        id="mood-input"
        type="text"
        placeholder="Enter mood (e.g., happy, sad, energized...)"
        value={ mood }
        onChange={handleMoodChange} // Handle changes in the mood input
      />

      {/* Button to submit mood */}
      <button onClick={handleMoodSubmit}>Submit Mood</button>

      <div className="select-container">
        <select className="neon-button" value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
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
      </div>
      <div className="control-buttons">
        <button onClick={handlePreviousSong}>Previous</button>
        <button onClick={handleNextSong}>Next</button>
      </div>

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
