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

import Tnt from '../src/server/app/Tnt'
import GameruleCreator from '../src/server/app/Gamerule'


const d0 = [ [8] ]

describe('Server test Tnt', function(){
	let tnt = new Tnt(GameruleCreator({}), 0)
	const GAMERULES = GameruleCreator()
	it('Tnt:: It should have matrix on null index given', function(done) {
		let tmp = new Tnt(GAMERULES, 0)
		chai.assert(Array.isArray(tmp.matrix))
		chai.assert(Array.isArray(tmp.matrix[0]))
		chai.assert(tmp.matrix[0][0] == 8)
		done()
	})

	it('Tnt:: It should have good position', function(done) {
		chai.assert(typeof tnt.position[0] == 'number')
		chai.assert(typeof tnt.position[1] == 'number')
		done()
	})

	it('Tnt:: It should moveY', function(done) {
		let oldPosY = tnt.position[1]
		tnt.move([0,1])
		chai.assert(oldPosY !== tnt.position[1])
		done()
	})

	it('Tnt:: It should moveX', function(done) {
		let oldPosY = tnt.position[0]
		tnt.move([1,0])
		chai.assert(oldPosY !== tnt.position[0])
		done()
	})

	it('Tnt:: It should setPostion', function(done) {
		tnt.setPosition([20,10])
		chai.assert(tnt.position[0] === 20)
		chai.assert(tnt.position[1] === 10)
		done()
	})

	it('Tnt:: It should have good left rotate', function(done) {
		tnt.rotate(-1)
		chai.assert(tnt.matrix.toString() == d0.toString())
		tnt.rotate(-1)
		chai.assert(tnt.matrix.toString() == d0.toString())
		tnt.rotate(-1)
		chai.assert(tnt.matrix.toString() == d0.toString())
		tnt.rotate(-1)
		chai.assert(tnt.matrix.toString() == d0.toString())
		done()
	})
})
