import React from 'react'
import * as event from '../actions/server.js'
import Left from '../components/left'
import Right from '../components/right'
import Board from '../components/board'
import Modal from '../components/modal'
import { connect } from 'react-redux'

const GameContainer = (props) => {
	const closeModal = function(e) {
		props.resetModal()
	}

	const goToRoom = function(e) {
		props.resetModal()
		props.resetBoard()
		props.resetBonus()
		props.stopGame(props.player.roomId, props.player.id)
		props.goto('/roommenu')
	}

	const goToRoomList = function(e) {
		props.resetModal()
		props.resetBoard()
		props.resetBonus()
		props.removePlayer(props.player.roomId, props.player.id)
		props.goto('/gamemenu')
	}
	const openModal = function() {
		props.printModal()
	}

	return (
	<div className="container">
		<Left imgWilson='assets/question.png' classWilson="question" actionWilson={openModal}/>
		<Board />
		<Right />
		{props.modal.state === true && (
			<Modal
				text={props.modal.text}
				onClickOutside={closeModal}
				onStayRoom={closeModal}
				onBackRoom={goToRoom}
				onExit={goToRoomList}
			/>
		)}
	</div>)
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
	goto: (page) => dispatch(event.changePage(page)),
	resetModal: () => dispatch(event.resetModal()),
	stopGame: (roomId, playerId) => dispatch(event.stopGame(roomId, playerId)),
	resetBoard: () => dispatch(event.resetBoard()),
	resetBonus: () => dispatch(event.resetBonus()),
	printModal: () => dispatch(event.printModal()),
	removePlayer: (roomId, playerId) => dispatch(event.removePlayer(roomId, playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)