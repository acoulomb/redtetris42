import React from 'react'
import * as event from '../actions/server.js'
import { connect } from 'react-redux'
import RoomList from './roomlist'

const GameMenu = (props) => {
	const submitName = function(props, event) {
		event.preventDefault()
		const data = new FormData(event.target)
		if (data.get('roomname') != ''){
			props.createRoom(data.get('roomname'), props.player.id)
			props.goto('/roommenu')
		} else {
			document.querySelector('#roomname').style.border = 'rgb(168, 61, 63) solid'
		}
	}

	return (
		<div className="content">
			<div className="menu-game">
				<RoomList rooms={props.rooms}/>
				<form className="column" onSubmit={(event) => submitName(props, event)}>
					<input id="roomname" name="roomname" type="text" placeholder="Chosse a room name"/>
					<button>OK</button>
				</form>
			</div>
		</div>
	)
}


const mapStateToProps = (state) =>  state

const mapDispatchToProps = (dispatch) => ({
	goto: (page) => dispatch(event.changePage(page)),
	createRoom: (name, playerId) => dispatch(event.createRoom(name, playerId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu)