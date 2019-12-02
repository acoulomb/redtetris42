import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'
import * as event from '../src/client/actions/server'

import io from 'socket.io-client'
import params from '../params'

import Player from '../src/server/app/Player'
import Piece from '../src/server/app/Piece'
import GameruleCreator from '../src/server/app/Gamerule'


describe('Server test Piece', function(){
	let tetrisServer
	let id

	before(cb => startServer( params.server, function(err, server){
		tetrisServer = server
		cb()
	}))

	after(function(done) {
		tetrisServer.stop(done)
	})

	afterEach(function(cb) {
		if (id) {
			clearInterval(id)
			id = undefined
		}
		cb()
	})

	it('Player:: Test down arrow', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldPosition
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 40,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldPosition) {
					oldPosition = action.data.pieces[0].position
				} else {
					if (oldPosition[0] - action.data.pieces[0].position[0] > 1) {
						done()
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Test right arrow', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldPosition
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 39,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldPosition) {
					oldPosition = action.data.pieces[0].position
				} else {
					if (oldPosition[1] < action.data.pieces[0].position[1]) {
						done()
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Test left arrow', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldPosition
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 37,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldPosition) {
					oldPosition = action.data.pieces[0].position
				} else {
					if (oldPosition[1] > action.data.pieces[0].position[1]) {
						done()
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Test e rotation', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldMatrix
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 69,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldMatrix) {
					oldMatrix = action.data.pieces[0].matrix
				} else {
					for (var i = 0; i < action.data.pieces[0].matrix.length; i++) {
						if (action.data.pieces[0].matrix[i].toString()
							!= oldMatrix[i].toString) {
							clearInterval(id)
							done()
							return
						}
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Test r rotation', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldMatrix
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 82,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldMatrix) {
					oldMatrix = action.data.pieces[0].matrix
				} else {
					for (var i = 0; i < action.data.pieces[0].matrix.length; i++) {
						if (action.data.pieces[0].matrix[i].toString()
							!= oldMatrix[i].toString) {
							clearInterval(id)
							done()
							return
						}
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Rotation up arrow', function(done) {
		const socket = io(params.server.url)
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldMatrix
		let haveResponse = true
		const store =  configureStore(rootReducer, socket, initialState, {
			createPlayerFromName: ({ action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Test', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
			startNewGame: ({ action }) => {
				id = setInterval((haveResponse) => {
					if (haveResponse == true) {
						haveResponse = false
						socket.emit('action', { type: 'server/onKeyDown', data: {
							playerId,
							roomId,
							keyCode: 38,
						}})
					}
				}, 400, haveResponse)
			},
			updateBoard: ({ action }) => {
				if (!oldMatrix) {
					oldMatrix = action.data.pieces[0].matrix
				} else {
					for (var i = 0; i < action.data.pieces[0].matrix.length; i++) {
						if (action.data.pieces[0].matrix[i].toString()
							!= oldMatrix[i].toString) {
							clearInterval(id)
							done()
							return
						}
					}
					haveResponse = true
				}
			}
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
	})

	it('Player:: Test blind', function(done) {
		this.timeout(50000)
		const initialState = {}
		const end = []
		let playerId
		let roomId
		let oldMatrix
		let haveResponse = true
		let zobaneId
		const socketZobane = io(params.server.url)
		const storeZobane =  configureStore(rootReducer, socketZobane, initialState, {
			createPlayerFromName: ({ action }) => {
				zobaneId = action.player.id
				storeZobane.dispatch(event.createRoom('Test', zobaneId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				setTimeout(() => {
					storeZobane.dispatch(event.startNewGame(roomId, zobaneId))
				}, 4000)
			},
			startNewGame: ({ action }) => {
				tetrisServer.giveBonusToPlayer(zobaneId, 2)
				socketZobane.emit('action', { type: 'server/onKeyDown', data: {
					playerId: zobaneId,
					roomId,
					keyCode: 66,
				}})
				setTimeout(() => {
					tetrisServer.giveBonusToPlayer(zobaneId, 1)
					socketZobane.emit('action', { type: 'server/onKeyDown', data: {
						playerId: zobaneId,
						roomId,
						keyCode: 66,
					}})
				}, 500)
			}
		})

		let alexId
		const socketAlex = io(params.server.url)
		let isFreezed
		let isBlinded
		const storeAlex =  configureStore(rootReducer, socketAlex, initialState, {
			createPlayerFromName: ({ action }) => {
				alexId = action.player.id
				setTimeout(() => {
					storeAlex.dispatch(event.joinRoom(roomId, alexId))
				}, 2000)
			},
			stateBlind: ({ action }) => {
				if (!isBlinded) {
					chai.assert(action.data.state === true)
					isBlinded = true
				} else {
					chai.assert(action.data.state === false)
					isBlinded = false
				}
				if (isFreezed === false && isBlinded === false) {
					done()
				}
			},
			stateFreeze: ({ action }) => {
				if (!isFreezed) {
					chai.assert(action.data.state === true)
					isFreezed = true
				} else {
					chai.assert(action.data.state === false)
					isFreezed = false
				}
				if (isFreezed === false && isBlinded === false) {
					done()
				}
			}
		})
		storeAlex.dispatch(event.createPlayerFromName('Alex'))
		storeZobane.dispatch(event.createPlayerFromName('Zobane'))
	})
})
