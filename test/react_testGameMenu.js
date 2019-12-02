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
import GameMenu from '../src/client/components/gamemenu'

const initialState = {
	room: {
		name: "testRoomName"
	},
	player: {
		id: 'test'
	}
}

const store = createStore(
	reducers,
	initialState,
	applyMiddleware(
		thunk,
	)
)

describe('GameMenu Component', () => {
	it('renders title', () => {
		const component = renderer.create(
			<Provider store={store}>
				<GameMenu />
			</Provider>
		)
 	})
})