import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FoliageAmbient from './FoliageAmbient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <App />
      <FoliageAmbient />
    </>
  </StrictMode>,
)
