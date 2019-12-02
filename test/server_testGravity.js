import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'

import * as event from '../src/client/actions/server'

import io from 'socket.io-client'
import params from '../params'
import ServerMaster from "../src/server/app/ServerMaster"
import Player from "../src/server/app/Player"

describe('Fake server test Gravity', function(){
    let tetrisServer

	before(cb => startServer( params.server, function(err, server){
		tetrisServer = server
		cb()
    }))
    
    after(function(done) {
		tetrisServer.stop(done)
	})

	it('Gravity:: It should receive update from game', function(done) {
        const initialState = {}
        let playerId
        let roomId
		const socket = io(params.server.url)
		const store =  configureStore(rootReducer, socket, initialState, {
			'createPlayerFromName': ({ dispatch, action }) => {
				playerId = action.player.id
				store.dispatch(event.createRoom('Les Titans', playerId))
			},
			createRoom: ({ action }) => {
				roomId = action.data.room.id
				store.dispatch(event.startNewGame(roomId, playerId))
			},
            updateGame: ({ action }) => {
                chai.assert(Array.isArray(action.data.pieces))
                chai.assert(action.data.hold === null)
                chai.assert(action.data.ladderPosition === 0)
                chai.assert(Array.isArray(action.data.spectres))
                done()
            }            
		})
		store.dispatch(event.createPlayerFromName('Zobane'))
    })
})
