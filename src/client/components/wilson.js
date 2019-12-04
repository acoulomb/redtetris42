import React from 'react'

const Wilson = (props) => {
	return (
		<div id="wilson-container" style={{ width: '100%', textAlign: 'center' }}>
			{
				(props.textWilson || props.imgWilson)
				? (
					<div id="bubble" 
							onClick={(e) => props.actionWilson && props.actionWilson()}
							style={props.textWilson && {animation: `hide 3s`, opacity: 0}}>
						{props.imgWilson && (
							<img className={props.classWilson} src={props.imgWilson} />
						)}
						{props.textWilson && (
							<p>{props.textWilson}</p>
						)}
					</div>
				)
				: (
					<div id="bubble" style={{visibility: "hidden"}} />
				)
			}
			{props.textWilson && (
				<img id="wilsontalk" src="assets/wilsontalk.png" />
			)}
			<img id="wilson" src="assets/wilson.png" />
		</div>
	)
}

export default Wilson