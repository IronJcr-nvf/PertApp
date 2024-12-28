import React from 'react';
import ReactDOM from 'react-dom/client';  // Use the new API from React 18
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
