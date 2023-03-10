import './App.css'
import Header from './Header'
import './App.css'
import Main from './Main'
import { ThemeChange } from './useContext'
import React from 'react'

function App() {
  return (
    <ThemeChange>
      <div className={` max-w-4xl mx-auto my-10 dark:text-white `}>
        <Header />
        <Main />
      </div>
    </ThemeChange>
  )
}

export default App
