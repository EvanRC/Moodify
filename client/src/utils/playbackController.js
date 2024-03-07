import axios from 'axios';

export const startPlayback = async (deviceId, trackUri, accessToken) => {
  try {
    const response = await axios.post('/api/start-playback', {
      device_id: deviceId,
      uris: trackUri
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log('Playback started successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error starting playback:', error);
    throw error;
  }
};