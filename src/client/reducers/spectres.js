const initial = []

const reducer = (state = initial , action) => {
	switch(action.type){
	case 'updateGame':
		return action.data.spectres
	case 'updateSpectres':
		return action.data.spectres
	case 'joinRoom':
		return action.data.spectres
	default: 
		return state
	}
}

export default reducer