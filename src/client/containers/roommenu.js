import React from 'react'
import * as event from '../actions/server.js'
import Snow from '../components/snow'
import Landscape from '../components/landscape'
import Board from '../components/board'
import PlayerList from '../components/playerlist'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from "react-router-dom"

const RoomContainer = (props) => {
	window.history.pushState('RoomMenu', `${props.player.roomId}`, `/#${props.player.roomId}[${props.player.name}]`);

	const exitGame = function(props, event) {
		event.preventDefault()
		props.removePlayer(props.room.id, props.player.id)
		props.exitRoom(props.room.id, props.player.id)
		props.goto('/gamemenu')
		window.history.pushState('Main', `Nothing`, `/`);
	}

	const runGame = function(props, event) {
		event.preventDefault()
		props.startNewGame(props.room.id, props.player.id)
	}

	const runYamsGame = function(props, event) {
		event.preventDefault()
		props.startNewYamsGame(props.room.id, props.player.id)
	}
	return (
	<div className="container">
		<div className="roomMenu" >
			<PlayerList />
			<div className="row">
				<button onClick={(event) => exitGame(props, event)}>
					Exit game
				</button>
				{props.room && props.room.players[0].id === props.player.id && (
					<button onClick={(event) => runGame(props, event)}>
						Run Game
					</button>
				)}
				{props.room && props.room.players[0].id === props.player.id && (
					<button onClick={(event) => runYamsGame(props, event)}>
						Run Yams Game
					</button>
				)}
			</div>
		</div>
	</div>)
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
	goto: (page) => dispatch(event.changePage(page)),
	startNewGame: (roomId, playerId) => dispatch(event.startNewGame(roomId, playerId)),
	startNewYamsGame: (roomId, playerId) => dispatch(event.startNewYamsGame(roomId, playerId)),
	removePlayer: (roomId, playerId) => dispatch(event.removePlayer(roomId, playerId)),
	exitRoom: (roomId, playerId) => dispatch(event.exitRoom(roomId, playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer)