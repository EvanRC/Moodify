const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const fetch = require('node-fetch');
const btoa = (str) => Buffer.from(str).toString('base64')
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3006;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

app.post('/api/exchange-token', async (req, res) => {
  const code = req.body.code;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  formData.append('redirect_uri', redirectUri);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Spotify API error: ${data.error} - ${data.error_description}`);
    }

    if (data.access_token) {
      res.json({ access_token: data.access_token });
    } else {
      res.status(400).json({ error: 'Failed to exchange token', details: data });
    }
  } catch (error) {
    console.error('Error during token exchange:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const startApolloServer = async () => {
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();