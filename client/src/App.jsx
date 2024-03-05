import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import SpotifyAuth from './components/spotifyAuth'; 
import Success from './components/Success'; 
import Menu from './components/Menu';
import './assets/styles.css';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotify-auth" element={<SpotifyAuth />} />
        <Route path="/success" element={<Success />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;