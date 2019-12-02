import React from 'react'

const Snow = () => {
	return (
		<div className="snow">
			<div className="snow__layer"><div className="snow__fall"></div></div>
			<div className="snow__layer"><div className="snow__fall"></div></div>
			<div className="snow__layer">
				<div className="snow__fall"></div>
				<div className="snow__fall"></div>
				<div className="snow__fall"></div>
			</div>
			<div className="snow__layer"><div className="snow__fall"></div></div>
		</div>
	)
}

export default Snow