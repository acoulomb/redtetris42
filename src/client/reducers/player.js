const initial = null

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'updateGame':
		return Object.assign({}, state, { hold: action.data.hold, spectre: action.data.spectre })
	case 'createRoom':
		return action.data.player
	case 'joinRoom':
		return action.data.player
	case 'removePlayer':
		return Object.assign({}, state, { roomId: null })
	case 'createPlayerFromName':
		return action.player
	default: 
		return state
	}
}

export default reducer