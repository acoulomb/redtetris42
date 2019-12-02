import React from 'react'
import { connect } from 'react-redux'
import * as event from '../actions/server.js'

const Login = (props) => {
	const submitName = function(props, event) {
		event.preventDefault()
		const data = new FormData(event.target)
		if (data.get('pseudo') != ''){
			props.createPlayerFromName(data.get('pseudo'))
			props.getRooms()
			props.goto('/gamemenu')
		} else {
			document.querySelector('#pseudo').style.border = 'rgb(168, 61, 63) solid'
		}
	}

	return (
		<div className="content">
			<div className="menu-login">
				<div className="title">Tetris</div>
				<div className="row">
					<form onSubmit={(event) => submitName(props, event)} className="column">
						<input type="text" id="pseudo" name="pseudo" placeholder="Your Name"/>
						<button>OK</button>
					</form>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const { player } = state
	return { player }
}

const mapDispatchToProps = (dispatch) => ({
	createPlayerFromName: (name) => dispatch(event.createPlayerFromName(name)),
	goto: (page) => dispatch(event.changePage(page)),
	getRooms: () => dispatch(event.getRooms()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)