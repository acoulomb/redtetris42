import React from 'react'
import { connect } from 'react-redux'

const Bonus = (props) => {
	return (
        <img id="bonus" src={"/assets/bonus-" + props.type + ".png"}/>
	)
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Bonus)
