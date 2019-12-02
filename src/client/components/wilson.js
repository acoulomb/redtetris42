import React from 'react'

const Wilson = (props) => {
	return (
		<div id="wilson-container" style={{ width: '100%', textAlign: 'center' }}>
			{
				(props.textWilson || props.imgWilson)
				? (
					<div id="bubble" onClick={(e) => props.actionWilson && props.actionWilson()}>
						{props.imgWilson && (
							<img className={props.classWilson} src={props.imgWilson} />
						)}
					</div>
				)
				: (
					<div id="bubble" style={{visibility: "hidden"}} />
				)
			}
			<img id="wilson" src="assets/wilsontalk.png" />
		</div>
	)
}

export default Wilson