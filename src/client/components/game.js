import React from 'react'
import Board from './board'
import Left from './left'
import Right from './right'

const Game = () => {
	return (
		<div className="container">
			<Left />
			<Board />
			<Right />
		</div>
	)
}

export default Game