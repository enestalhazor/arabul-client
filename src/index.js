import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Root } from './Root';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("enes")
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
reportWebVitals();
