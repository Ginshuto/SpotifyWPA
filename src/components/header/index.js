import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeaderDiv = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Header = props => {
  const history = useHistory()
  const toggleTheme = () => {
    console.log(localStorage.getItem('theme'))
    if (localStorage.getItem('theme') === 'light') {
      props.setTheme('dark')
    } else {
      props.setTheme('light')
    }
  }

  useEffect(() => {
    props.setToken(localStorage.getItem('token'))
  }, [history.location.pathname])

  const disconnect = () => {
    localStorage.removeItem('token')
    props.setToken(false)
    history.push('/')
  }

  return (
    <HeaderDiv>
      <button onClick={() => toggleTheme()}>Changer de thème</button>
      {props.token ? (
        <button onClick={disconnect}>Déconnexion</button>
      ) : (
        <div></div>
      )}
    </HeaderDiv>
  )
}

Header.propTypes = {
  setTheme: PropTypes.func.isRequired,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setToken: PropTypes.func.isRequired
}

export default Header
