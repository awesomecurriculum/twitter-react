import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithContext from './AppWithContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithContext />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
