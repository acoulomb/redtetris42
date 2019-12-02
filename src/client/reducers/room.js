const initial = null

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'createRoom':
		return action.data.room
	case 'updateRoom':
		return action.data.room
	default: 
		return state
	}
}

export default reducer