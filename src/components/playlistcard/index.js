import React from 'react'
import emptyPlaylistImg from '../../assets/emptyPlaylistImg.png'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CardContainer = styled.div`
  padding: 5%;
  border-radius: 6px;
  margin-bottom: 30px;
  background-color: ${props => props.theme.cardBackground};
`

const PlaylistImage = styled.img`
  width: 100%;
  border-radius: 6px;
`

const PlaylistName = styled.h2`
  margin-top: 20px;
  padding: 0;
  display: inline-block;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  color: ${props => props.theme.fontColor};
`

const PlaylistCard = props => {
  return (
    <CardContainer title='Cliquer pour voir les morceaux de la playlist'>
      {props.data.images.length != 0 ? (
        <PlaylistImage src={props.data.images[0].url}></PlaylistImage>
      ) : (
        <PlaylistImage src={emptyPlaylistImg}></PlaylistImage>
      )}
      <PlaylistName>{props.data.name}</PlaylistName>
    </CardContainer>
  )
}

PlaylistCard.propTypes = {
  data: PropTypes.object.isRequired
}

export default PlaylistCard
