import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './users/userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {logger} from 'redux-logger'

// const reducer = combineReducers({
//     reducer,
//     middleware: [...getDefaultMiddleware()]
// })

const store = createStore(
    userReducer,
    composeWithDevTools(applyMiddleware( logger, thunk))
  )
export default store;