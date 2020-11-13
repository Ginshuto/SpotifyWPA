import React from 'react'
import PropTypes from 'prop-types'

const SearchBarResults = props => {
  function addTrack(uri) {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir ajouter ce morceau à la playlist ?`
      )
    ) {
      const playlistID = localStorage.getItem('playlistID')
      const token = localStorage.getItem('token')
      const userID = localStorage.getItem('userID')
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Accept', 'application/json')
      myHeaders.append('Authorization', 'Bearer ' + token)
      const requestOptions = {
        method: 'post',
        headers: myHeaders,
        responseType: 'json',
        body: JSON.stringify({})
      }
      fetch(
        `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?uris=${uri}`,
        requestOptions
      )
        .then(res => res.json())
        .then(data => props.update(data))
    }
  }

  return (
    <div>
      <h4>⮚ 15 Résultats pour {props.search} :</h4>
      <ul>
        {props.data.tracks.items.map((element, index) => (
          <li
            title={`Cliquez pour ajouter à la playlist ${localStorage.getItem(
              'playlistName'
            )}`}
            key={index}
            onClick={() => addTrack(element.uri)}
          >
            {element.name} by {element.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  )
}

SearchBarResults.propTypes = {
  search: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default SearchBarResults
