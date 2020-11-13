import React, { useState, useEffect } from 'react'
import SearchBar from '../components/searchbar'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BackLink = styled.div`
  text-decoration: none;
  color: #1db954;
  width: 50%;
  margin: 25px 25%;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`

const PlaylistTracks = props => {
  const token = localStorage.getItem('token')
  const playlistID = props.match.params.id
  localStorage.setItem('playlistID', playlistID)
  const [tracks, setTracks] = useState(null)
  const [refresh, setRefresh] = useState(null)
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
        'Êtes-vous sûr de vouloir supprimer ce morceau de la playlist ?'
      )
    ) {
      const userID = localStorage.getItem('userID')
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
        `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
        requestOptions
      )
        .then(res => res.json())
        .then(data => setRefresh(data))
    }
  }

  useEffect(() => {
    tracklist()
  }, [refresh])

  return (
    <div>
      <BackLink onClick={() => props.history.goBack()}>
        Retour aux playlists
      </BackLink>
      {tracks != undefined ? (
        <div>
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
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default PlaylistTracks
