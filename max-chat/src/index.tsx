import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './pages/index/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

