import React from 'react'
import { connect } from 'react-redux'
import Bonus from './bonus'

const Unicorn = (props) => {
	return (
		<div style={{ position: 'relative' }}>
			<div id="unicorn-corn" style={{height: 35 - (props.game.combo * 35 / props.game.comboMin) + '%'}} />
			<img id="unicorn" src="assets/unicorn-corn2.png"/>
			{ props.game.bonusType != null && (
				<Bonus type={ props.game.bonusType }/>
			)}
		</div>
	)
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Unicorn)
