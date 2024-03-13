import axios from "axios";

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

export const generateMusicSuggestion = async (mood) => {
  const response = await axios.post(
    '/api/generate-music-suggestion', // Your server's proxy endpoint
    { mood }, // Send the mood as part of the request body
  );

  return response.data.choices[0].text.trim();
};
