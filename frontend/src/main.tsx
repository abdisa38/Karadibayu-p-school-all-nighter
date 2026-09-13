import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root application element.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
