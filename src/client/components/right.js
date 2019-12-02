import React from 'react'
import { connect } from 'react-redux'
import Tetrimino from './tetrimino'
import Spectre from './spectre'
import Score from './score'

const Right = (props) => {
	let filterSpectre = props.spectres.filter(s => s.id !== props.player.id)
	// let filterSpectre = props.spectres
	return (
		<div id="right">
			<Tetrimino title="next" tetrimino={(props.pieces && props.pieces.length > 1 && props.pieces[1]) || undefined}/>
			<div className="spectres">
				{filterSpectre.map((val, i) => (
					<Spectre key={i} playerName={val.name} spectre={val.spectre} effect={val.isUnderMalus}/>
				))}
			</div>
			<Score />
		</div>
	)
}

const mapStateToProps = (state) => {
	const { pieces, game, player, spectres } = state
	return { pieces, game, player, spectres }
}

export default connect(mapStateToProps)(Right)