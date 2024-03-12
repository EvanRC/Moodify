/**
 * Fetches songs from the Spotify API based on search terms.
 * @param {string} searchTerm The search term to use for the query, likely from OpenAI suggestion.
 * @param {string} accessToken Spotify access token.
 * @param {string} market The market where the songs should be available.
 * @return {Promise<Array>} An array of track objects.
 */


export const fetchSongsBySearchTerm = async (searchTerm, accessToken, market = 'US') => {
  if (!accessToken) {
    throw new Error("Access token is required for Spotify API requests.");
  }

  try {
    // Replace 'genre' with the searchTerm in the query.
    // You may also remove the 'genre:' prefix if the search term may not always represent a genre.
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(searchTerm)}&market=${market}&limit=10`, {
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

  export async function fetchHappySongs(accessToken) {
    const response = await fetch('https://api.spotify.com/v1/recommendations?limit=10&market=US&min_energy=0.7&min_valence=0.7', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    return data.tracks;
  }

