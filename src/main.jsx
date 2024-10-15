// index.js or main.js (whichever entry point you're using)
import { createRoot } from 'react-dom/client'
import App from './App'
// main.jsx

import { BrowserRouter } from 'react-router-dom'

// ...

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
