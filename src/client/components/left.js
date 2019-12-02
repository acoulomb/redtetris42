import React from 'react'
import Unicorn from './unicorn'
import Wilson from './wilson'
import { connect } from 'react-redux'
import Tetrimino from './tetrimino'

const Left = (props) => {
	return (
		<div id="left">
			<Tetrimino title="hold" tetrimino={props.game.hold || undefined}/>
			<Unicorn />
			{props.game.endGame || props.game.endSoloGame
				? <Wilson textWilson={props.textWilson} classWilson={props.classWilson} imgWilson={props.imgWilson} actionWilson={props.actionWilson} />
				: <Wilson />
			}
		</div>
	)
}


const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Left)
