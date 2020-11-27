import React, { useState } from 'react'
import SearchBarResults from '../searchbarresults'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
`

const mapState = state => ({ token: state.token })

const SearchBar = props => {
  const { token } = useSelector(mapState)
  const [inputValue, setInputValue] = useState('')
  const [tracks, setTracks] = useState(null)

  function searchTrack(trackName) {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Authorization', 'Bearer ' + token)
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      responseType: 'json'
    }
    fetch(
      `https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=15`,
      requestOptions
    )
      .then(res => res.json())
      .then(data => setTracks(data))
  }

  function enterPressed(event) {
    var code = event.keyCode || event.which
    if (code === 13) {
      searchTrack(inputValue)
    }
  }

  return (
    <div>
      <InputDiv>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => enterPressed(e)}
        ></input>
        <button onClick={() => searchTrack(inputValue)}>
          Chercher un morceau
        </button>
      </InputDiv>
      {tracks !== null ? (
        <SearchBarResults
          data={tracks}
          search={inputValue}
          update={props.update}
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  update: PropTypes.func.isRequired
}

export default SearchBar
