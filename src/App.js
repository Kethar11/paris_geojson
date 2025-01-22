import React from 'react';
import ParisMap from './components/ParisMap';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ParisMap />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Paris Map Viewer</p>
      </footer>
    </div>
  );
}

export default App;