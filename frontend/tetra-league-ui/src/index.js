import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CookiesProvider } from 'react-cookie';  // Import CookiesProvider

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>  {/* Wrap with CookiesProvider */}
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
