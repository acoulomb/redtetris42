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

import Snow from '../src/client/components/snow'
import Modal from '../src/client/components/modal'
import Line from '../src/client/components/line'
import Column from '../src/client/components/column'
import Wilson from '../src/client/components/wilson'

describe('Simple Components', () => {
	it('Simple Components:: Snow', () => {
		const component = renderer.create(<Snow />)
		expect(component.root.findByProps({className: "snow"}).children.length).toEqual(4)
 	})
 	
 	it('Simple Components:: Modal', () => {
		const component = renderer.create(<Modal />)
		expect(component.root.findByProps({className: "modal"}).children.length).toEqual(1)
 	})

 	it('Simple Components:: Line', () => {
		const component = renderer.create(<Line data={[0,0,0,0]} />)
		expect(component.root.findByProps({className: "line"}).children.length).toEqual(4)
 	})

 	it('Simple Components:: Column', () => {
		const component = renderer.create(<Column data={[0,0,0,0]} />)
		expect(component.root.findByProps({className: "board-column"}).children.length).toEqual(4)
 	})

 	it('Simple Components:: Wilson talks', () => {
		const component = renderer.create(<Wilson textWilson='hello world' />)
		expect(component.root.findByProps({id: "wilson-container"}).children.length).toEqual(3)
	 })

 	it('Simple Components:: Wilson has image', () => {
		const component = renderer.create(<Wilson imgWilson="assets/question.png" />)
		expect(component.root.findByProps({id: "wilson-container"}).children.length).toEqual(2)
	 })
})