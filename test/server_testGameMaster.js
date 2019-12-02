import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'
import * as event from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'

params.server.loopSpeed = 60

describe('GameMaster Fake server test', function(){
	let tetrisServer

	before(cb => startServer( params.server, function(err, server){
		tetrisServer = server
		cb()
	}))

	after(function(done) {
		tetrisServer.stop(done)
	})

	it('GameMaster:: It should check if the game is running', function(done) {
		const socket = io(params.server.url)
		const initialState = {}
		let playerId
		let roomId
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.gameIsRunning(roomId))
			},
			gameIsRunning: ({ action }) =>  {
				chai.assert(action.room.isRunning === false)
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('GameMaster:: It should check if the game is started', function(done) {
		const socket = io(params.server.url)
		const initialState = {}
		let playerId
		let roomId
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.gameIsRunning(roomId))
			},
			gameIsRunning: ({ action }) =>  {
				chai.assert(action.room.isRunning === false)
				done()
			},
			startNewGame: ({ action }) =>  {
				chai.assert(action.data.state === 1)
				done()
			}			
		})
		store.dispatch(event.createPlayerFromName('Zobane')) // Ne sais pas quoi lui donner en param 🙄
	})

	it('GameMaster:: It should check if there is return at the end', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			updateGame: ({ action }) => {
				// console.log('OKKKK')
			},
			endSoloGame: () => {
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('GameMaster:: It should check if there is return at the end', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			updateGame: ({ action }) => {
				// console.log('OKKKK')
			},
			endGame: () => {
				done()
			},
			endSoloGame: () => {
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
		store.dispatch(event.createPlayerFromName('Zalex'))
	})
})
