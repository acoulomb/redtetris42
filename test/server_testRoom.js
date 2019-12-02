import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'

import * as event from '../src/client/actions/server'
	
import io from 'socket.io-client'
import params from '../params'


describe('Fake server test Room', function(){
	let tetrisServer
	before(cb => startServer( params.server, function(err, server){
		tetrisServer = server
		cb()
	}))

	after(function(done) {
		tetrisServer.stop(done)
	})	


	it('Room:: It should check if a player joins a room', function(done) {
		let playerId = []
		let roomId
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) => {
				playerId.push(action.player.id)
				if (playerId.length > 1) {
					store.dispatch(event.createRoom('Les Titans', playerId[0]))
				}
			},
			'createRoom': ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.joinRoom(roomId, playerId[1]))
			},
			'joinRoom': ({ action }) =>  {
				chai.assert(action.data.player.roomId === roomId)
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
		store.dispatch(event.createPlayerFromName('AlekZander'))
	})
	
	it('Room:: It should check if the game is started', function(done) {
		let playerId = []
		let roomId
		let isDone = false
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) => {
				playerId.push(action.player.id)
				if (playerId.length > 1) {
					store.dispatch(event.createRoom('Les Titans', playerId[0]))
				}
			},
			'createRoom': ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.joinRoom(roomId, playerId[1]))
			},
			'joinRoom': ({ action }) =>  {
				chai.assert(action.data.player.roomId === roomId)
				store.dispatch(event.startNewGame(roomId, playerId[0]))
			},
			'startNewGame': ({ action }) =>  {
				chai.assert(action.data.state === 1)
				if (isDone === false) {
					done()
					isDone = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
		store.dispatch(event.createPlayerFromName('AlekZander'))
	})
	
	it('Room:: It should check if the game could be started again', function(done) {
		let playerId = []
		let roomId
		let isDone = false
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) => {
				playerId.push(action.player.id)
				store.dispatch(event.createRoom('Les Titans', playerId[0]))
			},
			'createRoom': ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.joinRoom(roomId, playerId[0]))
			},
			'joinRoom': ({ action }) =>  {
				chai.assert(action.data.player.roomId === roomId)
				store.dispatch(event.startNewGame(roomId, playerId[0]))
			},
			'startNewGame': ({ action }) =>  {
				if (isDone === false) {
					chai.assert(action.data.state === 1)
					isDone = true
					store.dispatch(event.startNewGame(roomId, playerId[0]))
				} else {
					// console.log(action)
					chai.assert(action.success === false)
					done()
				}
			}
		})
		store.dispatch(event.createPlayerFromName('AlekZander'))
	})

	it('Room:: It should check if the game is running', function(done) {
		let playerId = []
		let roomId
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) => {
				playerId.push(action.player.id)
				store.dispatch(event.createRoom('Les Titans', playerId[0]))
			},
			'createRoom': ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId[0]))
			},
			'startNewGame': ({ action }) =>  {
				chai.assert(action.data.state === 1)
				store.dispatch(event.gameIsRunning(roomId))
			},
			'gameIsRunning': ({ action }) =>  {
				chai.assert(action.room.isRunning === true)
				done()
			},
		})
		store.dispatch(event.createPlayerFromName('AlekZander'))
	})

	it('Room:: It should check if the player is removed from the room', function(done) {
		let playerId = []
		let roomId
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) => {
				playerId.push(action.player.id)
				store.dispatch(event.createRoom('Les Titans', playerId[0]))
			},
			'createRoom': ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.joinRoom(roomId, playerId[0]))
			},
			'joinRoom': ({ action }) =>  {
				chai.assert(action.data.player.roomId === roomId)
				store.dispatch(event.removePlayer(roomId, playerId[0]))
			},
			'removePlayer': ({ action }) =>  {
				chai.assert(action.success === true)
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})
})
