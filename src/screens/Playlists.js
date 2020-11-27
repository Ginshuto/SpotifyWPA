import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import PlaylistCard from '../components/playlistcard'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/action'

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
`

const mapState = state => ({ token: state.token, userID: state.userID })

const Playlists = () => {
  const { token, userID } = useSelector(mapState)
  let history = useHistory()
  const dispatch = useDispatch()
  const [playlist, setPlaylist] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Authorization', 'Bearer ' + token)
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    responseType: 'json'
  }

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  }, [])

  function getPlaylists() {
    fetch('https://api.spotify.com/v1/me/playlists', requestOptions)
      .then(res => res.json())
      .then(data => {
        setPlaylist(data)
        dispatch({
          type: actions.SET_USER_ID,
          value: data.items[0].owner.id
        })
      })
  }

  useEffect(() => {
    getPlaylists()
  }, [refresh])

  function addPlaylist(playlistName) {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      responseType: 'json',
      body: JSON.stringify({
        name: playlistName
      })
    }
    fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      requestOptions
    )
      .then(res => res.json())
      .then(data => setRefresh(data))
  }

  function enterPressed(event) {
    var code = event.keyCode || event.which
    if (code === 13) {
      addPlaylist(inputValue)
      alert('Playlist créée.')
    }
  }

  return (
    <div>
      <h1>Mes Playlists</h1>
      {playlist !== null ? (
        <div>
          {playlist.items.map((element, index) => (
            <Link
              to={`/playlists/${element.id}`}
              key={index}
              onClick={() => {
                dispatch({
                  type: actions.SET_PLAYLIST_NAME,
                  value: element.name
                })
                dispatch({
                  type: actions.SET_PLAYLIST_ID,
                  value: element.id
                })
              }}
            >
              <PlaylistCard data={element} />
            </Link>
          ))}
          <InputDiv>
            <input
              type='text'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => enterPressed(e)}
            ></input>
            <button onClick={() => addPlaylist(inputValue)}>
              Créer une playlist
            </button>
          </InputDiv>
        </div>
      ) : (
        <div>
          <input
            type='text'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => enterPressed(e)}
          ></input>
          <button onClick={() => addPlaylist(inputValue)}>
            Créer une playlist
          </button>
        </div>
      )}
    </div>
  )
}

export default Playlists
