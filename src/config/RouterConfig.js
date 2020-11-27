import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../screens/Login'
import Playlists from '../screens/Playlists'
import PlaylistTracks from '../screens/PlaylistTracks'
import Header from '../components/header'

const RouterConfig = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/playlists' component={Playlists} />
        <Route path='/playlists/:id' component={PlaylistTracks} />
        <Route path='/' component={Login} />
      </Switch>
    </Router>
  )
}

export default RouterConfig
