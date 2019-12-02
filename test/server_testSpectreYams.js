import chai from "chai"
import {
	startServer,
	configureStore,
} from './helpers/server'
import rootReducer from '../src/client/reducers'
import {
	gameIsRunning,
} from '../src/client/actions/server'

import io from 'socket.io-client'
import params from '../params'

import Spectre from '../src/server/app/Spectre'
import Piece from '../src/server/app/Piece'
import GameruleCreator from '../src/server/app/Gamerule'

const spectreBoardRef = new Array(10)
for (var i = 0; i < spectreBoardRef.length; i++) {
	spectreBoardRef[i] = new Array(20).fill(0)
}

describe('Server test Spectre', function(){
	let spectre 
	let piece = {
		position: [2,0],
		matrix: [
			[0,0,0,0],
			[6,5,4,3],
			[0,0,0,0],
			[0,0,0,0],
		]
	}

	let board = [
		[6,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[5,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[4,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[9,3,3,5,5,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[9,5,3,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[9,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
	]

	let origin = Array.from(piece.position)

	beforeEach(cb => {
		spectre = new Spectre()
		spectre.board = board
		spectre.board.forEach(l => {
			console.log(l.join(','))
		})
		spectre.checkBoardYams(piece)
		console.log()
		spectre.board.forEach(l => {
			console.log(l.join(','))
		})
		cb()
	})

	it('Spectres Yams:: It should have create empty Spectre', function(done) {

		done()
	})

})
