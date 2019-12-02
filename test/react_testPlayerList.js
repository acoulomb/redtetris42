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
import PlayerList from '../src/client/components/playerlist'


describe('PlayerList Component', () => {
	it('PlayerList:: Only one player', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<PlayerList />
			</Provider>
		)
		expect(component.root.findByProps({className: "row room-player"}).children.length).toEqual(1)
		expect(component.root.findByProps({className: "row room-player"}).children[0]).toEqual('Zobane')
 	})

 	it('PlayerList:: Without player', () => {
		const initialState = { room: { players: [] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<PlayerList />
			</Provider>
		)
		expect(component.root.findByProps({className: "column"}).children.length).toEqual(0)
 	})

 	it('PlayerList:: No room', () => {
		const initialState = {  }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<PlayerList />
			</Provider>
		)
		expect(component.root.findByProps({className: "column"}).children.length).toEqual(0)
 	})
})