import { persistReducer } from 'redux-persist'
import actions from './action'
import initialState from './state'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

export default persistReducer(persistConfig, (state = initialState, action) => {
  const { type, value } = action

  switch (type) {
    case actions.SET_THEME: {
      return { ...state, theme: value }
    }
    case actions.SET_TOKEN: {
      return { ...state, token: value }
    }
    case actions.SET_PLAYLIST_NAME: {
      return { ...state, playlistName: value }
    }
    case actions.SET_PLAYLIST_ID: {
      return { ...state, playlistID: value }
    }
    case actions.SET_USER_ID: {
      return { ...state, userID: value }
    }
    default:
      return state
  }
})
