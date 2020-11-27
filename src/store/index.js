import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

import { persistStore } from 'redux-persist'

let middlewares = applyMiddleware(thunk)

export const store = createStore(reducer, middlewares)

export const persistor = persistStore(store)

export default { store, persistor }
