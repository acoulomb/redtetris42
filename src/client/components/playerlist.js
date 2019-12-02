import React from 'react'
import { connect } from 'react-redux'
import * as event from '../actions/server.js'

const PlayerList = (props) => {
	return (
		<div className="column">
			{props.room && props.room.players.map(p => (
				<div key={p.id} className="row room-player">
					{p.name}
				</div>
			))}
		</div>)
}

const mapStateToProps = (state) => {
	const { room } = state
	return { room }
}

export default connect(mapStateToProps)(PlayerList)