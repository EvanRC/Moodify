import axios from "axios";

const openAIKey = import.meta.env.VITE_OPENAI_API_KEY;

export const generateMusicSuggestion = async (mood) => {
    const response = await axios.post(
        `https://api.openai.com/v1/chat-completions`, // Correct URL for GPT-3.5-turbo engine
        {
          model: "gpt-3.5-turbo-instruct", // Specify the model here
          prompt: `Make a music playlist for the mood: ${mood}`,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1.0,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        },
        {
          headers: {
            'Authorization': `Bearer ${openAIKey}`,
          },
        }
      );
    return response.data.choices[0].text.trim();
};
