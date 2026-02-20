import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Remove <React.StrictMode> for development pop-up testing
createRoot(document.getElementById("root")).render(
  <App />
)
