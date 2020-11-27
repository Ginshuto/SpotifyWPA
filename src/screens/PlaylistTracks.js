import React, { useState, useEffect } from 'react'
import SearchBar from '../components/searchbar'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/action'

const BackLink = styled.div`
  text-decoration: none;
  text-align: center;
  color: #1db954;
  width: 50%;
  margin: 25px 25%;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
`

const PlaylistName = styled.h1`
  color: #1db954;
  width: 100%;
  margin: 25px 0;
`

const mapState = state => ({
  token: state.token,
  playlistName: state.playlistName,
  playlistID: state.playlistID
})

const PlaylistTracks = props => {
  const { token, playlistName, playlistID } = useSelector(mapState)
  const dispatch = useDispatch()
  const [tracks, setTracks] = useState(null)
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

  function tracklist() {
    fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
      requestOptions
    )
      .then(res => res.json())
      .then(data => setTracks(data))
  }

  function deleteTrack(uri) {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ce morceau de la playlist ${playlistName} ?`
      )
    ) {
      const requestOptions = {
        method: 'delete',
        headers: myHeaders,
        responseType: 'json',
        body: JSON.stringify({
          tracks: [
            {
              uri: uri
            }
          ]
        })
      }
      fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        requestOptions
      )
        .then(res => res.json())
        .then(data => setRefresh(data))
    }
  }

  useEffect(() => {
    tracklist()
  }, [refresh])

  function enterPressed(event) {
    var code = event.keyCode || event.which
    if (code === 13) {
      changePlaylistName(inputValue)
    }
  }

  function changePlaylistName(inputValue) {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir changer le nom de la playlist ${playlistName} en ${inputValue} ?`
      )
    ) {
      const requestOptions = {
        method: 'put',
        headers: myHeaders,
        responseType: 'json',
        body: JSON.stringify({
          name: inputValue
        })
      }
      fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}`,
        requestOptions
      ).then(data => {
        setRefresh(data)
        dispatch({
          type: actions.SET_PLAYLIST_NAME,
          value: inputValue
        })
      })
    }
  }

  return (
    <div>
      <BackLink onClick={() => props.history.goBack()}>
        Retour aux playlists
      </BackLink>
      {tracks != undefined ? (
        <div>
          <PlaylistName>{playlistName}</PlaylistName>
          <InputDiv>
            <input
              type='text'
              value={inputValue}
              placeholder={playlistName}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => enterPressed(e)}
            ></input>
            <button onClick={() => changePlaylistName(inputValue)}>
              Renommer la playlist
            </button>
          </InputDiv>
          <ul>
            {tracks.items.map((element, index) => (
              <li
                title='Cliquez pour supprimer de la playlist'
                key={index}
                onClick={() => deleteTrack(element.track.uri)}
              >
                {index + 1} / {element.track.name} by{' '}
                {element.track.artists[0].name}
              </li>
            ))}
          </ul>
          <SearchBar update={setRefresh} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

PlaylistTracks.propTypes = {
  history: PropTypes.object.isRequired
}

export default PlaylistTracks
