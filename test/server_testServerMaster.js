import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'

import * as event from '../src/client/actions/server'

import io from 'socket.io-client'
import params from '../params'

describe('Fake server test ServerMaster', function(){

	let tetrisServer
	let idPlayer
	let idRoom

	before(cb => startServer(params.server, function(err, server){
		tetrisServer = server
		cb()
	}))
	
	after(function(done) {
		tetrisServer.stop(done)
	})

	it('ServerMaster:: It should create new Player from name', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) =>  {
				chai.assert(action.player.name === 'Patate')
				chai.assert(action.player.id !== null)
				chai.assert(action.player.scoreMax === 0)
				idPlayer = action.player.id
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Patate'))
	})
	
	it('ServerMaster:: It should get new Player created from name', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'getPlayerFromName': ({ action }) => {
				chai.assert(action.player !== null)
				chai.assert(action.player.name === 'Patate')
				done()
			}
		})
		store.dispatch(event.getPlayerFromName('Patate'))
	})

	it('ServerMaster:: It should get a Player from id', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'getPlayerFromId': ({ action }) => {
				chai.assert(action.player !== null)
				chai.assert(action.player.id === idPlayer)
				done()
			}
		})
		store.dispatch(event.getPlayerFromId(idPlayer))
	})

	it('ServerMaster:: It should delete `Kikou` player', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		let idPlayer
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ action }) =>  {
				idPlayer = action.player.id
				store.dispatch(event.deletePlayer(action.player.id))
			},
			'deletePlayer': ({ action }) => {
				chai.assert(action.success === true)
				done()
			}
		})
		store.dispatch(event.createPlayerFromName('Kikou'))
	})

	it('ServerMaster:: It should not delete unknow player', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'deletePlayer': ({ action }) =>  {
				chai.assert(action.success === false)
				done()
			}
		})
		store.dispatch(event.deletePlayer(-1))
	})
	
	it('ServerMaster:: It should get the list of all Players', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'getPlayers': ({ action }) => {
				chai.assert(Array.isArray(action.players))
				done()
			}
		})
		store.dispatch(event.getPlayers())
	})

	it('ServerMaster:: It should create a new Room attached to a player', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createRoom': ({ action }) =>  {
				chai.assert(action.data.room.id !== null)
				chai.assert(action.data.room.players !== [])
				chai.assert(action.data.room.state === 0)
				chai.assert(action.data.room.master !== null)
				idRoom = action.data.room.id
				done()
			}
		})
		store.dispatch(event.createRoom("Yams Club", idPlayer))
	})

	it('ServerMaster:: It should get the list of all Rooms', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'getRooms': ({ action }) =>  {
				chai.assert(Array.isArray(action.rooms))
				done()
			}
		})
		store.dispatch(event.getRooms())
	})

	it('ServerMaster:: It should get a Room from id', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'getRoomFromId': ({ action }) => {
				chai.assert(action.room.id !== null)
				chai.assert(action.room.id === idRoom)
				done()
			}
		})
		store.dispatch(event.getRoomFromId(idRoom))
	})

	it('ServerMaster:: It should delete a Room from id', function(done) {
		const initialState = {}
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'deleteRoom': ({ action }) => {
				chai.assert(action.room === true)
				done()
			}
		})
		store.dispatch(event.deleteRoom(idRoom))
	})

})
