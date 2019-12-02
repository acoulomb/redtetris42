import React, { useEffect } from 'react'

const Modal = (props) => {
	return (
		<div className="modal" onClick={(event) => props.onClickOutside(event)}>
            <div className="modal-message">
                <p>{props.text}</p>
				<button onClick={(e) => props.onBackRoom(e)}>GO BACK TO ROOM</button>
				<button onClick={(e) => props.onStayRoom(e)}>STAY ON ROOM</button>
				<button onClick={(e) => props.onExit(e)}>EXIT</button>
            </div>
		</div>
	)
}

export default Modal