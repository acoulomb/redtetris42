import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as event from '../actions/server.js'
import Column from './column'
import Modal from './modal'

const Board = (props) => {
	// console.log({props})
	let init = false
	const onKeyDown = (e) => {
		props.onKeyDown(props.player.roomId, props.player.id, e)
	}
	useEffect(() => {
		if (init === false) {
			document.addEventListener("keydown", onKeyDown)
		}
		init = true
		return () => {
			document.removeEventListener("keydown", onKeyDown)
		}
	}, [props]) 
	return (
		<div className="gameBoard">
			{props.room.name && (
				<div className="banner bannerRoom"><p>{props.room.name}</p></div>
			)}
			{props.board && props.board.map((d, indexLine) => {
				return <Column key={indexLine} renderYamsMode={props.game.rules.yams} data={d} />
			})}
			{props.blind.state === true && (
				<div id='blind'>You have been blinded by {props.blind.playerName} !</div>
			)}
		</div>
	)
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
	onKeyDown: (room, player, e) => dispatch(event.onKeyDown(room, player, e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)