import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import * as event from './actions/server.js'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'                                                                                                                                                    
import reducers from './reducers'
import io from 'socket.io-client'
import App from './containers/app'
import params from '../../params'

const socket = io(params.server.url)
const initialState = {}

const ioSocketMiddleware = socket => store => {
	socket.on('action', store.dispatch)
	return next => action => {
		// console.log(action)
		if (action.type.startsWith("server/"))
		{
			socket.emit('action', action)
			return
		}
		else
			return next(action)
	}
}

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(
		thunk,
		ioSocketMiddleware(socket),
		createLogger(),
	)
)
const { hash } = window.location
if (hash != '') {
	store.dispatch(event.sendHash(hash))
}

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))
