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

import Piece from '../src/server/app/Piece'
import GameruleCreator from '../src/server/app/Gamerule'


const d0 = [ [0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0] ]
const d1 = [ [0,0,1,0], [0,0,1,0], [0,0,1,0], [0,0,1,0] ]
const d2 = [ [0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0] ]
const d3 = [ [0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0] ]

describe('Server test Piece', function(){
	let piece = new Piece(GameruleCreator({}), 0)
	const GAMERULES = GameruleCreator()
	it('Pieces:: It should have matrix on null index given', function(done) {
		let tmp = new Piece(GAMERULES, 0)
		chai.assert(Array.isArray(tmp.matrix))
		chai.assert(GAMERULES.Pieces.indexOf(tmp.matrix) > -1)
		done()
	})

	it('Pieces:: It should have good position', function(done) {
		chai.assert(typeof piece.position[0] == 'number')
		chai.assert(typeof piece.position[1] == 'number')
		done()
	})

	it('Pieces:: It should have good matrix', function(done) {
		chai.assert(Array.isArray(GAMERULES.Pieces.find(p => p.toString() == piece.matrix.toString())))
		done()
	})

	it('Pieces:: It should moveY', function(done) {
		let oldPosY = piece.position[1]
		piece.move([0,1])
		chai.assert(oldPosY !== piece.position[1])
		done()
	})

	it('Pieces:: It should moveX', function(done) {
		let oldPosY = piece.position[0]
		piece.move([1,0])
		chai.assert(oldPosY !== piece.position[0])
		done()
	})

	it('Pieces:: It should setPostion', function(done) {
		piece.setPosition([20,10])
		chai.assert(piece.position[0] === 20)
		chai.assert(piece.position[1] === 10)
		done()
	})

	it('Pieces:: It should have good left rotate', function(done) {
		piece.rotate(-1)
		chai.assert(piece.matrix.toString() == d3.toString())
		piece.rotate(-1)
		chai.assert(piece.matrix.toString() == d2.toString())
		piece.rotate(-1)
		chai.assert(piece.matrix.toString() == d1.toString())
		piece.rotate(-1)
		chai.assert(piece.matrix.toString() == d0.toString())
		done()
	})

	it('Pieces:: It should have good multiple left rotate', function(done) {
		piece.rotate(-2)
		chai.assert(piece.matrix.toString() == d2.toString())
		piece.rotate(-2)
		chai.assert(piece.matrix.toString() == d0.toString())
		done()
	})

	it('Pieces:: It should have good right rotate', function(done) {
		piece.rotate(1)
		chai.assert(piece.matrix.toString() == d1.toString())
		piece.rotate(1)
		chai.assert(piece.matrix.toString() == d2.toString())
		piece.rotate(1)
		chai.assert(piece.matrix.toString() == d3.toString())
		piece.rotate(1)
		chai.assert(piece.matrix.toString() == d0.toString())
		done()
	})

	it('Pieces:: It should have good multiple right rotate', function(done) {
		piece.rotate(2)
		chai.assert(piece.matrix.toString() == d2.toString())
		piece.rotate(2)
		chai.assert(piece.matrix.toString() == d0.toString())
		done()
	})

	it('Pieces:: It should have good null rotate', function(done) {
		piece.rotate(0)
		chai.assert(piece.matrix.toString() == d0.toString())
		done()
	})		
})
