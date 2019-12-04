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
import Login from '../src/client/components/login'
import Wilson from '../src/client/components/wilson'
import Unicorn from '../src/client/components/unicorn'
import Tetrimino from '../src/client/components/tetrimino'
import Spectre from '../src/client/components/spectre'
import Score from '../src/client/components/score'
import Landscape from '../src/client/components/landscape'
import Board from '../src/client/components/board'
import Bonus from '../src/client/components/bonus'

describe('Component', () => {
	it('Login::', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Login />
			</Provider>
		)
		expect(component.root.findByProps({className: "content"}).children.length).toEqual(1)
		expect(component.root.findByProps({className: "menu-login"}).children.length).toEqual(2)
 	})
})

describe('Wilson Component', () => {
	it('Wilson::', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Wilson />
			</Provider>
		)
 	})
})

describe('Unicorn Component', () => {
	it('Unicorn::', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Unicorn />
			</Provider>
		)
 	})
})

describe('Tetrimino Component', () => {
	it('Tetrimino::', () => {
		const initialState = { room: { players: [{ id: 'test', name: 'Zobane'}] } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Tetrimino />
			</Provider>
		)
 	})
})

describe('Spectre Component', () => {
	it('Spectre::', () => {
		const component = renderer.create(
			<Spectre playerName="test" effect={true} spectre={[]}/>
		)
 	})
})

describe('Score Component', () => {
	it('Score::', () => {
		const initialState = { game: { score: 100 } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Score />
			</Provider>
		)
 	})
})

describe('Landscape Component', () => {
	it('Landscape::', () => {
		const component = renderer.create(
			<Landscape />
		)
 	})
})

describe('Board Component', () => {
	it('Board::', () => {
		const initialState = { room: { name: 'Test' } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Board />
			</Provider>
		)
 	})
})

describe('Bonus Component', () => {
	it('Bonus::', () => {
		const initialState = { game: { bonusType: 0 } }
		const store = createStore(reducers, initialState, applyMiddleware( thunk ))
		const component = renderer.create(
			<Provider store={store}>
				<Bonus />
			</Provider>
		)
 	})
})
