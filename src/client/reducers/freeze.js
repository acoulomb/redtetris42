const initial = {
	state: false,
	playerName: null,
}

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'stateFreeze':
		return action.data
	default:
		return state
	}
}

export default reducer