import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import PlaylistCard from '../components/playlistcard'
import styled from 'styled-components'

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
`

const Playlists = () => {
  let history = useHistory()
  const token = localStorage.getItem('token')
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
      .then(data => setPlaylist(data))
  }

  useEffect(() => {
    getPlaylists()
  }, [refresh])

  function addPlaylist(playlistName) {
    var userID = localStorage.getItem('userID')
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
            <Link to={`/playlists/${element.id}`} key={index}>
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
