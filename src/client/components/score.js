import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as event from '../actions/server.js'

const Score = (
	props
) => {
	return (
		<div id="score" className="box">
			<div className="banner"><p>score</p></div>
			<div className="scoreVal">{ props.score }</div>
		</div>
	)
}

const mapStateToProps = (state) => state.game

export default connect(mapStateToProps)(Score)