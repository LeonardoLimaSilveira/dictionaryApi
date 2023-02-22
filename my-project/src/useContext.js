import React from 'react'

export const GlobalContext = React.createContext()

export const ThemeChange = ({ children }) => {
  const [theme, setTheme] = React.useState(false)
  const [font, setFont] = React.useState('')

  return (
    <GlobalContext.Provider value={{ theme, setTheme, setFont, font }}>
      {children}
    </GlobalContext.Provider>
  )
}
