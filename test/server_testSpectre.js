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
	let piece = new Piece(GameruleCreator(), 0)
	let origin = Array.from(piece.position)

	beforeEach(cb => {
		spectre = new Spectre()
		cb()
	})
	it('Spectres:: It should have create empty Spectre', function(done) {
		chai.assert(Array.isArray(spectre.board))
		chai.assert(spectre.board.toString() == spectreBoardRef.toString())
		done()
	})

	it('Spectres:: It shouldn\'t collide with first piece', function(done) {
		spectre.addPiece(piece, piece.position)
		chai.assert(spectre.isCollide(piece, piece.position) === true)
		done()
	})
	
	it('Spectres:: It should have add piece correctly', function(done) {
		spectre.addPiece(piece, piece.position)
		spectreBoardRef[piece.position[0] + 1] = [0,0,0,1,1,1,1,0,0,0]
		chai.assert(spectre.board[1].toString() === spectreBoardRef[1].toString())
		done()
	})

	it('Spectres:: It should collide', function(done) {
		spectre.addPiece(piece, piece.position)
		piece.move([0, 1])
		chai.assert(spectre.isCollide(piece, piece.position) == true)
		piece.move([0, 1])
		chai.assert(spectre.isCollide(piece, piece.position) === true)
		piece.move([0, 1])
		chai.assert(spectre.isCollide(piece, piece.position) === true)
		piece.move([0, 1])
		chai.assert(spectre.isCollide(piece, piece.position) === true)
		done()
	})

	it('Spectres:: It shouldn\'t collide', function(done) {
		piece.setPosition([10, 6])
		chai.assert(spectre.isCollide(piece, piece.position) === false)
		piece.setPosition([10, 0])
		chai.assert(spectre.isCollide(piece, piece.position) === false)
		done()
	})
	
	it('Spectres:: It should simple delete line', function(done) {
		let square = new Piece(GameruleCreator(), 3)
		for (let i = 0; i < 10; i += 2) {
			square.setPosition([1, i])
			spectre.addPiece(square, square.position)
		}
		spectre.checkBoard()
		for (let i = 0; i < 10; i += 2) {
			square.setPosition([1, i])
			chai.assert(spectre.isCollide(square, square.position) === false)
		}
		chai.assert(spectre.board.length === 10)
		for (let i = 0; i < spectre.board.length; i++) {
			chai.assert(spectre.board[i].length === 20)
		}
		done()
	})
	
	it('Spectres:: It should simple delete line with tetriminos above', function(done) {
		let square = new Piece(GameruleCreator(), 3)
		for (let i = 0; i < 10; i += 2) {
			square.setPosition([1, i])
			spectre.addPiece(square, square.position)
		}
		square.setPosition([3, 0])
		spectre.addPiece(square, square.position)
		spectre.checkBoard()
		for (let i = 0; i < 10; i += 2) {
			square.setPosition([1, i])
			if (i == 0)
				chai.assert(spectre.isCollide(square, square.position) === true)
			else
				chai.assert(spectre.isCollide(square, square.position) === false)
		}
		chai.assert(spectre.board.length === 10)
		for (let i = 0; i < spectre.board.length; i++) {
			chai.assert(spectre.board[i].length === 20)
		}
		done()
	})
})
