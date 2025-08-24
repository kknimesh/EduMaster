import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log('🎓 EduMaster v2.0 - Math Learning Platform - React App Loaded!');
console.log('Deployment timestamp:', new Date().toISOString());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);