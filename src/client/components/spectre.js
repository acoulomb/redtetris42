import React from 'react'
import Column from './column'

const Spectre = (props) => {
	return (
		<div className="player " style={{opacity: (props.effect == true) ? '0.3' : 1}}>
			<p className="playerName">{ props.playerName }</p>
			<div className="spectre">
				{props.spectre.map((d, indexLine) => {
					return <Column key={indexLine} renderYamsMode={false} data={d} />
				})}
			</div>
		</div>
	)
}

export default Spectre