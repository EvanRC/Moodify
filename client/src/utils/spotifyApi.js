/**
 * Fetches songs from the Spotify API based on search terms.
 * @param {string} searchTerm The search term to use for the query, likely from OpenAI suggestion.
 * @param {string} accessToken Spotify access token.
 * @param {string} market The market where the songs should be available.
 * @return {Promise<Array>} An array of track objects.
 */


export const fetchSongsBySearchTerm = async (searchTerm, accessToken, market = 'US', searchType = 'genre') => {
  if (!accessToken) {
    throw new Error("Access token is required for Spotify API requests.");
  }
  const limit = 10;
  let query;
  if (searchType === 'genre') {
    // If it's a genre, use the genre-specific search syntax Spotify supports
    query = `genre:"${encodeURIComponent(searchTerm)}"`;
  } else {
    // Otherwise, use the searchTerm as is for mood-based or other searches
    query = encodeURIComponent(searchTerm);
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}&market=${market}&limit=${limit}`, {
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
  // export async function fetchHappySongs(accessToken) {
  //   const response = await fetch('https://api.spotify.com/v1/recommendations?limit=10&market=US&min_energy=0.7&min_valence=0.7', {
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   });
  //   const data = await response.json();
  //   return data.tracks;
  // }

