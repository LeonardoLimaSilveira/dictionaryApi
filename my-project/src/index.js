import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeChange } from './useContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeChange>
      <App />
    </ThemeChange>
  </React.StrictMode>
)
