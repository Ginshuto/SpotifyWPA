import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import actions from '../store/action'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const NoInternetText = styled.p`
  text-align: center;
`

const LoginLink = styled.a`
  display: inline-block;
  text-align: center;
  width: 70%;
  margin: 25px 15% 0 15%;
  box-sizing: border-box;
  color: white;
  background-color: #1db954;
  text-decoration: none;
  padding: 11px 10px;
  border-radius: 50px;
`

const Login = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const internet = navigator.onLine
  const client_ID = '12ebc58d644148119c27df63ef38fc7d'
  const redirect_URI = window.location.origin
  const scopes =
    'user-read-private user-read-email playlist-modify playlist-modify-public user-library-read playlist-modify-private'
  const authorizeURL =
    'https://accounts.spotify.com/authorize?client_id=' +
    client_ID +
    '&response_type=token&redirect_uri=' +
    redirect_URI +
    '&scope=' +
    scopes

  useEffect(() => {
    if (window.location.hash !== '') {
      dispatch({
        type: actions.SET_TOKEN,
        value: window.location.hash.match(/access_token=([^&]*)/)[1]
      })
      history.push('/playlists')
    } else {
      dispatch({
        type: actions.SET_TOKEN,
        value: null
      })
    }
  }, [])

  return (
    <LoginContainer>
      <h1>Bienvenue sur MySpotify !</h1>
      {!internet ? (
        <NoInternetText>
          Vous êtes actuellement hors connexion. Veuillez vous connecter à
          Internet.
        </NoInternetText>
      ) : (
        <LoginLink href={authorizeURL}>Se connecter à Spotify</LoginLink>
      )}
    </LoginContainer>
  )
}

export default Login
