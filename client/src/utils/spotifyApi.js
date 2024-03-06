/**
 * Fetches songs by a given genre from the Spotify API.
 * @param {string} genre The genre to search for.
 * @param {string} accessToken Spotify access token.
 * @return {Promise<Array>} An array of track objects.
 */
export const fetchSongsByGenre = async (genre, accessToken) => {
    if (!accessToken) {
      throw new Error("Access token is required for Spotify API requests.");
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=genre:${encodeURIComponent(genre)}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Spotify API responded with ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.tracks.items; // Array of tracks
    } catch (error) {
      console.error("Error fetching songs from Spotify API:", error);
      throw error; // Re-throw the error for handling by the caller
    }
  };