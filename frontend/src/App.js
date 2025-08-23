import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleShowcase from './pages/SimpleShowcase.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SimpleShowcase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;