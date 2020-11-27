import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeLight, themeDark } from './config/themes'
import RouterConfig from './config/RouterConfig'
import { useHistory } from 'react-router-dom'
import { GlobalStyle } from './config/globalStyle'
import { useSelector } from 'react-redux'

const mapState = state => ({ theme: state.theme })

function App() {
  const { theme } = useSelector(mapState)
  let history = useHistory()

  useEffect(() => {
    const timer = setTimeout(() => {
      window.alert("Le token d'accès a expiré, vous allez être déconnecté.")
      history.push('/')
    }, 3500000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
      <GlobalStyle />
      <RouterConfig />
    </ThemeProvider>
  )
}

export default App
