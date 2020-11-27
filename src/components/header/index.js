import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../store/action'
import styled from 'styled-components'

const HeaderDiv = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const mapState = state => ({ token: state.token, theme: state.theme })

const Header = () => {
  const { token, theme } = useSelector(mapState)
  const dispatch = useDispatch()
  const history = useHistory()
  const toggleTheme = () => {
    if (theme === 'light') {
      dispatch({
        type: actions.SET_THEME,
        value: 'dark'
      })
    } else {
      dispatch({
        type: actions.SET_THEME,
        value: 'light'
      })
    }
  }

  const disconnect = () => {
    dispatch({
      type: actions.SET_TOKEN,
      value: null
    })
    dispatch({
      type: actions.SET_PLAYLIST_NAME,
      value: null
    })
    dispatch({
      type: actions.SET_PLAYLIST_ID,
      value: null
    })
    history.push('/')
  }

  return (
    <HeaderDiv>
      <button onClick={() => toggleTheme()}>Changer de thème</button>
      {token ? <button onClick={disconnect}>Déconnexion</button> : <div></div>}
    </HeaderDiv>
  )
}

export default Header
