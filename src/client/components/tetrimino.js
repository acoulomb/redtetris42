import React from 'react'
import Line from './line'

const Tetrimino = (props) => {
	if (props.tetrimino === undefined || props.tetrimino === null) {
		return (
		<div id="hold" className="box">
			<div className="banner"><p>{props.title}</p></div>
			<div className="tetriminoBack">
				<div className="tetrimino">
					<div className="line" />
					<div className="line" />
					<div className="line" />
					<div className="line" />
				</div>
			</div>
		</div>)
	}
	return (
		<div id="hold" className="box">
			<div className="banner"><p>{props.title}</p></div>
			<div className="tetriminoBack">
				<div className="tetrimino">
					{props.tetrimino.matrix.map((line, indexLine) => (
						<Line key={indexLine} data={line} />
					))}
				</div>
			</div>
		</div>

	)
}

export default Tetrimino