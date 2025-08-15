import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import Home from 'pages/Home';
import People from 'pages/People';
import Publications from 'pages/Publications';
import Photos from 'pages/Photos';
import Contact from 'pages/Contact';
import Footer from 'components/Footer';
import styles from 'styles/App.module.css';

function App() {
  return (
    <Router>
      <Header />
      <div className={styles.container}>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
