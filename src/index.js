import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Pakka karein ki App.jsx isi folder mein hai
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);