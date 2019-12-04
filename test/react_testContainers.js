import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()});
import React from 'react'
import expect from 'expect'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'                                                                                                                                                    
import reducers from '../src/client/reducers'
import { createStore, applyMiddleware } from 'redux'
import Game from '../src/client/containers/game'

describe('Game Container', () => {
	it('Game::', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Game />
			</Provider>
		)
 	})
})