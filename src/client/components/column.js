import React from 'react'

const Column = (props) => {
	return (
		<div className="board-column">
			{props.data.map((val, i) => {
				switch (val) {
					case -1:
						return (<div key={i} className="block" style={{background:'rgb(197, 165, 93)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 1:
						return (<div key={i} className="block" style={{background:'rgb(48, 55, 83)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 2:
						return (<div key={i} className="block" style={{background:'rgb(168, 61, 63)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 3:
						return (<div key={i} className="block" style={{background:'rgb(71, 41, 88)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 4:
						return (<div key={i} className="block" style={{background:'rgb(209, 179, 61)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 5:
						return (<div key={i} className="block" style={{background:'rgb(113, 131, 167)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 6:
						return (<div key={i} className="block" style={{background:'rgb(205, 107, 27)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 7:
						return (<div key={i} className="block" style={{background:'rgb(61, 122, 94)', boxShadow:' inset 0px 0px 0px 1px black'}}>
						</div>)
					case 8:
						return (<div key={i} className="block" style={{backgroundImage: 'url("assets/bonus-0.png"'}}>
						</div>)
					default:
						return <div key={i} className="block" />
				}
			})}
		</div>
	)
}
export default Column