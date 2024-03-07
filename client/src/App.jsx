import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import Menu from './components/Menu';
import Callback from './components/Callback';
import './assets/styles.css';

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/Callback" element={<Callback />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;