import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeLight, themeDark } from './config/themes'
import RouterConfig from './config/RouterConfig'
import { useHistory } from 'react-router-dom'
import { GlobalStyle } from './config/globalStyle'

function App() {
  let history = useHistory()
  const themeValue = localStorage.getItem('theme')
  const [theme, setTheme] = useState(themeValue ? themeValue : 'dark')
  const [token, setToken] = useState(localStorage.getItem('token'))
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.removeItem('playlistID')
    const timer = setTimeout(() => {
      window.alert("Le token d'accès a expiré, vous allez être déconnecté.")
      history.push('/')
    }, 3500000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <RouterConfig setTheme={setTheme} token={token} setToken={setToken} />
    </ThemeProvider>
  )
}

export default App
