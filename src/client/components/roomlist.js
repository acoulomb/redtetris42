import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import * as event from '../actions/server.js'

const RoomList = (props) => {
	const joinGame = function(props, event, room) {
		event.preventDefault()
		props.joinRoom(room.id, props.player.id)
		props.goto('/roommenu')
	}

	return (
		<div className="column">
			{props.rooms.map(room => (
				<div key={room.id} className="room">
					<p className="title">{room.name}</p>
					<p className="players">Players {room.nplayers}/5</p>
					<button className="btn-join" onClick={(event) => joinGame(props, event, room)}>Rejoindre</button>
				</div>
			))}
		</div>)
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
	goto: (page) => dispatch(event.changePage(page)),
	joinRoom: (roomId, playerId) => dispatch(event.joinRoom(roomId, playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomList)