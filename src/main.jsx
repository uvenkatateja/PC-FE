import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Check if we're in production and on Render
const isProduction = import.meta.env.PROD;
const isRender = window.location.hostname.includes('render.com');

// Use HashRouter for Render in production to avoid refresh issues
// Use BrowserRouter for local development
const Router = isProduction && isRender ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
